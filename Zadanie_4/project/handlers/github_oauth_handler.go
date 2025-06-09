package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"project/database"
	"project/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

func getGithubOauthConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  "http://localhost:8080/auth/github/callback",
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}
}

func GithubLogin(c echo.Context) error {
	conf := getGithubOauthConfig()
	url := conf.AuthCodeURL("random-state-string", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func GithubCallback(c echo.Context) error {
	conf := getGithubOauthConfig()
	code := c.QueryParam("code")
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to exchange token: "+err.Error())
	}

	client := conf.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to get user info: "+err.Error())
	}
	defer func() {
		if err := resp.Body.Close(); err != nil {
			c.Logger().Error("Failed to close response body:", err)
		}
	}()

	var userInfo struct {
		Login string `json:"login"`
		ID    int    `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return c.String(http.StatusInternalServerError, "Failed to decode user info: "+err.Error())
	}

	var user models.User
	db := database.GetDB()
	if err := db.Where("username = ?", userInfo.Login).First(&user).Error; err != nil {
		user = models.User{
			Username:     userInfo.Login,
			PasswordHash: "",
		}
		if err := db.Create(&user).Error; err != nil {
			return c.String(http.StatusInternalServerError, "Failed to create user: "+err.Error())
		}
	}

	jwtSecret := []byte(os.Getenv("JWT_SECRET_KEY"))
	tokenJWT := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"user_id":  user.ID,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := tokenJWT.SignedString(jwtSecret)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to sign token: "+err.Error())
	}

	redirectURL := "http://localhost:3000/?token=" + tokenString
	return c.Redirect(http.StatusTemporaryRedirect, redirectURL)
}
