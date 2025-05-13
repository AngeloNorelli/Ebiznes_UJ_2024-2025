package handlers

import (
	"net/http"
	"project/database"
	"project/models"

	"github.com/labstack/echo/v4"
)

const noCategoryError = "Category not found"

func CreateCategory(c echo.Context) error {
	category := new(models.Category)
	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadGateway, err)
	}

	database.DB.Create(&category)
	return c.JSON(http.StatusOK, category)
}

func GetCategories(c echo.Context) error {
	var categories []models.Category
	database.DB.Preload("Products").Find(&categories)
	return c.JSON(http.StatusOK, categories)
}

func GetCategoryByID(c echo.Context) error {
	id := c.Param("id")
	var category models.Category
	if err := database.DB.Preload("Products").First(&category, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCategoryError})
	}
	return c.JSON(http.StatusOK, category)
}

func AddProductToCategory(c echo.Context) error {
	categoryID := c.Param("id")
	var category models.Category
	if err := database.DB.First(&category, categoryID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCategoryError})
	}

	productID := c.QueryParam("product_id")
	if productID != "" {
		var product models.Product
		if err := database.DB.First(&product, productID).Error; err != nil {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
		}

		product.CategoryID = category.ID
		if err := database.DB.Save(&product).Error; err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Failed to update product category"})
		}
	}

	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	product.CategoryID = category.ID

	if err := database.DB.Create(&product).Error; err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Failed to add product to category"})
	}

	return c.JSON(http.StatusOK, category)
}

func RemoveProductFromCategory(c echo.Context) error {
	categoryID := c.Param("id")
	productID := c.Param("product_id")

	var category models.Category
	if err := database.DB.First(&category, categoryID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": noCategoryError})
	}

	var product models.Product
	if err := database.DB.Where("id = ? AND category_id = ?", productID, categoryID).First(&product).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found in this category"})
	}

	product.CategoryID = 0
	if err := database.DB.Save(&product).Error; err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Failed to remove product from category"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Product removed from category"})
}
