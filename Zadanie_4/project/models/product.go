package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	Name       string  `json:"name"`
	Price      float64 `json:"price"`
	Stock      int     `json:"stock"`
	CategoryID uint    `json:"category_id"`
}

func FilterByCategory(categoryID uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("category_ID = ?", categoryID)
	}
}

func FilterByPriceRange(minPrice, maxPrice float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price BETWEEN ? AND ?", minPrice, maxPrice)
	}
}

func FilterInStock() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("stock > 0")
	}
}
