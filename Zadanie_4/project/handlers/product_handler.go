package handlers

import (
	"net/http"
	"project/database"
	"project/models"
	"strconv"

	"github.com/labstack/echo/v4"
)

func CreateProduct(c echo.Context) error {
	product := new(models.Product)
	if err := c.Bind(product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	database.DB.Create(&product)
	return c.JSON(http.StatusCreated, product)
}

func GetProducts(c echo.Context) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProductByID(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
	}
	return c.JSON(http.StatusOK, product)
}

func UpdateProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
	}

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	database.DB.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
	}

	database.DB.Delete(&product)
	return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted"})
}

func GetFilteredProducts(c echo.Context) error {
	var products []models.Product

	categoryID := c.QueryParam("category_id")
	minPrice := c.QueryParam("min_price")
	maxPrice := c.QueryParam("max_price")
	inStock := c.QueryParam("in_stock")

	query := database.DB.Model(&models.Product{})
	if categoryID != "" {
		categoryIDUint, err := strconv.ParseUint(categoryID, 10, 32)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid category_id"})
		}
		query = query.Scopes(models.FilterByCategory(uint(categoryIDUint)))
	}
	if minPrice != "" && maxPrice != "" {
		minPriceFloat, err := strconv.ParseFloat(minPrice, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid min_price"})
		}
		maxPriceFloat, err := strconv.ParseFloat(maxPrice, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid max_price"})
		}
		query = query.Scopes(models.FilterByPriceRange(minPriceFloat, maxPriceFloat))
	}
	if inStock == "true" {
		query = query.Scopes(models.FilterInStock())
	}

	query.Find(&products)
	return c.JSON(http.StatusOK, products)
}
