package main

import (
	"project/database"
	"project/handlers"
	"log"
	"os"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	jwtMiddleware "github.com/labstack/echo-jwt/v4"
)

const productIdEndpoint = "/products/:id"

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.InitDatabase()
	db := database.GetDB()

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	e.POST("/products", handlers.CreateProduct)
	e.GET("/products", handlers.GetProducts)
	e.GET(productIdEndpoint, handlers.GetProductByID)
	e.PUT(productIdEndpoint, handlers.UpdateProduct)
	e.DELETE(productIdEndpoint, handlers.DeleteProduct)
	e.GET("/products/filtered", handlers.GetFilteredProducts)

	e.POST("/carts", handlers.CreateCart)
	e.GET("/carts/:id", handlers.GetCartByID)
	e.POST("/carts/:id/products", handlers.AddProductToCart)
	e.PUT("/carts/:id/items/:item_id", handlers.UpdateCartItem)

	e.POST("/categories", handlers.CreateCategory)
	e.GET("/categories", handlers.GetCategories)
	e.GET("/categories/:id", handlers.GetCategoryByID)
	e.POST("/categories/:id/products", handlers.AddProductToCategory)
	e.DELETE("/categories/:id/products/:product_id", handlers.RemoveProductFromCategory)

	e.POST("/payments", handlers.CreatePayment, jwtMiddleware.WithConfig(jwtMiddleware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET_KEY")),
	}))
	e.GET("/payments", handlers.GetPayments)

	e.POST("/login", handlers.Login(db))
	e.POST("/register", handlers.Register(db))
	e.GET("/auth/google/login", handlers.GoogleLogin)
	e.GET("/auth/google/callback", handlers.GoogleCallback)

	e.Logger.Fatal(e.Start(":8080"))
}
