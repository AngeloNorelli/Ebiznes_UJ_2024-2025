package main

import (
	"project/database"
	"project/handlers"

	"github.com/labstack/echo/v4"
)

func main() {
	database.InitDatabase()

	e := echo.New()

	e.POST("/products", handlers.CreateProduct)
	e.GET("/products", handlers.GetProducts)
	e.GET("/products/:id", handlers.GetProductByID)
	e.PUT("/products/:id", handlers.UpdateProduct)
	e.DELETE("/products/:id", handlers.DeleteProduct)

	e.POST("/carts", handlers.CreateCart)
	e.GET("/carts/:id", handlers.GetCartByID)
	e.POST("/carts/:id/products", handlers.AddProductToCart)
	e.PUT("/carts/:id/items/:item_id", handlers.UpdateCartItem)

	e.Logger.Fatal(e.Start(":8080"))
}
