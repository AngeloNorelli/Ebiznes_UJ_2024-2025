package main

import (
	"project/database"
	"project/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const productIdEndpoint = "/products/:id"

func main() {
	database.InitDatabase()

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

	e.POST("/payments", handlers.CreatePayment)
	e.GET("/payments", handlers.GetPayments)

	e.Logger.Fatal(e.Start(":8080"))
}
