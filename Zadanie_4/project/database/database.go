package database

import (
	"project/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database!")
	}

	err = DB.AutoMigrate(&models.Product{}, &models.Cart{}, &models.CartItem{}, &models.Category{}, &models.Payment{}, &models.User{})
	if err != nil {
		panic("failed to migrate database: " + err.Error())
	}
}

func GetDB() *gorm.DB {
	return DB
}
