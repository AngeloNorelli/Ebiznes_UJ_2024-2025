package main

import (
    "project/database"
    "project/models"
    "log"
)

func main() {
    database.InitDatabase()
    db := database.GetDB()
		db.Exec("DELETE FROM products")
		db.Exec("DELETE FROM categories")
		db.Exec("DELETE FROM users")
		db.Exec("DELETE FROM payments")
		db.Exec("DELETE FROM carts")
		db.Exec("DELETE FROM cart_items")

    electronics := models.Category{Name: "Electronics"}
    books := models.Category{Name: "Books"}

    if err := db.Create(&electronics).Error; err != nil {
        log.Fatal("Error creating category Electronics:", err)
    }
    if err := db.Create(&books).Error; err != nil {
        log.Fatal("Error creating category Books:", err)
    }

    products := []models.Product{
        {Name: "Laptop", Price: 3500.0, Stock: 10, CategoryID: electronics.ID},
        {Name: "Smartphone", Price: 2000.0, Stock: 15, CategoryID: electronics.ID},
        {Name: "Headphones", Price: 300.0, Stock: 30, CategoryID: electronics.ID},
        {Name: "Book: Go Programming", Price: 120.0, Stock: 20, CategoryID: books.ID},
        {Name: "Book: React in Action", Price: 100.0, Stock: 25, CategoryID: books.ID},
    }

    for _, p := range products {
        if err := db.Create(&p).Error; err != nil {
            log.Println("Error creating product:", p.Name, err)
        }
    }

    log.Println("Seeding finished!")
}