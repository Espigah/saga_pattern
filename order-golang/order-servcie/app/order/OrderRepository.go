package order

import (
	"fmt"

	"../database"

	"database/sql"

	_ "github.com/lib/pq"
)

func InsertOrder(orderEntity OrderEntity) OrderEntity {
	fmt.Println("[ InsertOrder ]")

	sqlStatement := `
	INSERT INTO  public."order" (detail, transaction_status)
	VALUES ($1, $2)`

	fmt.Printf("[ InsertOrder::entity ] %s - %s \n", orderEntity.Detail, orderEntity.TransactionStatus)

	var db *sql.DB = database.Connect()

	defer db.Close()

	var result OrderEntity

	row := db.QueryRow(sqlStatement, orderEntity.Detail, orderEntity.TransactionStatus) //.Scan(&result)

	fmt.Println("[ InsertOrder::query ]", row)

	err := row.Scan(&result)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Zero rows found")
		} else {
			panic(err)
		}
	}
	fmt.Println("[ InsertOrder::completed ]")

	return result
}
