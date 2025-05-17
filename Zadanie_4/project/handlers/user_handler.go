package handlers

import (
	"net/http"
	"time"
	"os"
	"github.com/labstack/echo/v4"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"project/models"
	"gorm.io/gorm"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET_KEY"))

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var req LoginRequest
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
		}

		var user models.User
		if err := db.Where("username = ?", req.Username).First(&user).Error; err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid credentials"})
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid credentials"})
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": 	user.ID,
			"username": user.Username,
			"exp":			time.Now().Add(time.Hour * 24).Unix(),
		})

		tokenString, err := token.SignedString(jwtSecret)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not generate token"})
		}

		return c.JSON(http.StatusOK, map[string]string{"token": tokenString})
	}
}