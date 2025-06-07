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

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegisterRequest struct {
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

		jwtSecret := []byte(os.Getenv("JWT_SECRET_KEY"))
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

func Register(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var req RegisterRequest
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
		}
		if req.Username == "" || req.Password == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Username and password are required"})
		}

		var existing models.User
		if err := db.Where("username = ?", req.Username).First(&existing).Error; err == nil {
			return c.JSON(http.StatusConflict, map[string]string{"message": "Username already exists"})
		}

		hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not hash password"})
		}

		user := models.User{
			Username:     req.Username,
			PasswordHash: string(hashed),
		}
		if err := db.Create(&user).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Could not create user"})
		}

		return c.JSON(http.StatusCreated, map[string]string{"message": "User registered successfully"})
	}
}