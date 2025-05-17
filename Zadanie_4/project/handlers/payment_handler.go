package handlers

import (
	"net/http"
	"project/database"
	"project/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type PaymentRequest struct {
	Amount float64           `json:"amount"`
	Method string            `json:"method"`
	Cart   []models.CartItem `json:"cart"`
}

func extractUserID(c echo.Context) uint {
	user := c.Get("user")
	if user != nil {
		if token, ok := user.(*jwt.Token); ok {
			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				if id, ok := claims["user_id"].(float64); ok {
					return uint(id)
				}
			}
		}
	}
	return 0
}

func CreatePayment(c echo.Context) error {
	req := new(PaymentRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	userID := extractUserID(c)

	cart := models.Cart{
		UserID:    userID,
		TotalCost: req.Amount,
	}

	for _, item := range req.Cart {
		var product models.Product
		if err := database.DB.First(&product, item.Product.ID).Error; err != nil {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "Product not found"})
		}

		if product.Stock < item.Quantity {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"message": "Insufficient stock for product: " + product.Name,
			})
		}

		product.Stock -= item.Quantity
		if err := database.DB.Save(&product).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to update product stock"})
		}

		cart.Items = append(cart.Items, models.CartItem{
			ProductID: item.Product.ID,
			Product:   product,
			Quantity:  item.Quantity,
			Price:     product.Price,
		})
	}

	if err := database.DB.Create(&cart).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	payment := models.Payment{
		Amount: req.Amount,
		Method: req.Method,
		CartID: cart.ID,
	}

	if err := database.DB.Create(&payment).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Payment created successfully",
		"cart":    cart,
		"payment": payment,
	})
}

func GetPayments(c echo.Context) error {
	var payment []models.Payment
	database.DB.Find(&payment)
	return c.JSON(http.StatusOK, payment)
}
