package handlers

import (
	"net/http"
	"project/database"
	"project/models"

	"github.com/labstack/echo/v4"
)

const noCartError = "Cart not found in database"

func CreateCart(c echo.Context) error {
	cart := new(models.Cart)

	if err := c.Bind(cart); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	database.DB.Create(&cart)
	return c.JSON(http.StatusCreated, cart)
}

func AddProductToCart(c echo.Context) error {
	cartID := c.Param("id")
	var cart models.Cart

	if err := database.DB.First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCartError})
	}

	item := new(models.CartItem)
	if err := c.Bind(item); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	var product models.Product
	if err := database.DB.First(&product, item.ProductID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
	}

	item.CartID = cart.ID
	item.Price = product.Price
	cart.TotalCost += product.Price * float64(item.Quantity)

	database.DB.Create(&item)
	database.DB.Save(&cart)
	return c.JSON(http.StatusOK, cart)
}

func GetCartByID(c echo.Context) error {
	id := c.Param("id")
	var cart models.Cart

	if err := database.DB.Preload("Items").Preload("Items.Product").First(&cart, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCartError})
	}

	return c.JSON(http.StatusOK, cart)
}

func UpdateCartItem(c echo.Context) error {
	cartID := c.Param("id")
	var cart models.Cart

	if err := database.DB.First(&cart, cartID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCartError})
	}

	itemID := c.Param("item_id")
	var item models.CartItem

	if err := database.DB.First(&item, itemID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Item not found"})
	}

	updateItem := new(models.CartItem)
	if err := c.Bind(updateItem); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	difference := float64(updateItem.Quantity - item.Quantity)
	item.Quantity = updateItem.Quantity
	cart.TotalCost += difference

	database.DB.Save(&item)
	database.DB.Save(&cart)

	return c.JSON(http.StatusOK, cart)
}
