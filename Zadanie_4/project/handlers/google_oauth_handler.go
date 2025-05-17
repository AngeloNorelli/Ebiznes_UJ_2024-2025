package handlers

import (
	"net/http"
	"os"
	"time"
	"encoding/json"
	"context"
	"github.com/labstack/echo/v4"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"project/database"
	"project/models"
)

func getGoogleOauthConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:		 	os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret:	os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:	"http://localhost:8080/auth/google/callback",
		Scopes:			 	[]string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:		 	google.Endpoint,
	}
}

func GoogleLogin(c echo.Context) error {
	conf := getGoogleOauthConfig()
	url := conf.AuthCodeURL("random-state-string", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func GoogleCallback(c echo.Context) error {
	conf := getGoogleOauthConfig()
	code := c.QueryParam("code")
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to exchange token"})
	}

	client := conf.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to get user info"})
	}
	defer resp.Body.Close()

	var userInfo struct {
		Email string `json:"email"`
		Name  string `json:"name"`
		Id		string `json:"id"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to decode user info"})
	}

	var user models.User
	db := database.GetDB()
	if err := db.Where("username = ?", userInfo.Name).First(&user).Error; err != nil {
		user = models.User{
			Username: userInfo.Name,
			PasswordHash: "",
		}
		if err := db.Create(&user).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to create user"})
		}
	}

	jwtSecret := []byte(os.Getenv("JWT_SECRET_KEY"))
	tokenJWT := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := tokenJWT.SignedString(jwtSecret)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not generate token"})
	}

	redirectURL := "http://localhost:3000/?token=" + tokenString
	return c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}