package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserID    uint       `json:"user_id"`
	Items     []CartItem `json:"items"`
	TotalCost float64    `json:"total_cost"`
}

type CartItem struct {
	gorm.Model
	CartID    uint    `json:"cart_id"`
	ProductID uint    `json:"product_id"`
	Product   Product `json:"product"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}
