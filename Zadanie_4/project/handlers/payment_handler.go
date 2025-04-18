package handlers

import (
	"net/http"
	"project/database"
	"project/models"

	"github.com/labstack/echo/v4"
)

func CreatePayment(c echo.Context) error {
	payment := new(models.Payment)

	if err := c.Bind(payment); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	database.DB.Create(&payment)
	return c.JSON(http.StatusCreated, payment)
}

func GetPayments(c echo.Context) error {
	var payment []models.Payment
	database.DB.Find(&payment)
	return c.JSON(http.StatusOK, payment)
}
