package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	fmt.Println("[ DATABASE::Connect ]")
	//	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	//		"password=%s dbname=%s sslmode=disable",
	//		"localhost", 5432, "admin", "admin", "db")
	//fmt.Println(psqlInfo)
	db, err := sql.Open("postgres", os.Getenv("DATABASE"))
	if err != nil {
		fmt.Println("[ DATABASE ] Open error")
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Println("[ DATABASE ] Ping error")
		panic(err)
	}

	fmt.Println("[ DATABASE::connected ]")

	return db
}
