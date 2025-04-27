package models

import "gorm.io/gorm"

type Payment struct {
	gorm.Model
	Amount float64 `json:"amount"`
	Method string  `json:"method"`
	CartID uint    `json:"cart_id"`
}
