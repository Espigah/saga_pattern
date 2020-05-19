package order

import (
	"fmt"

	"../database"

	"database/sql"

	_ "github.com/lib/pq"
)

func Insert(orderEntity OrderEntity) OrderEntity {
	fmt.Println("[ InsertOrder ]")

	sqlStatement := `
	INSERT INTO  public."order" (detail, transaction_status)
	VALUES ($1, $2)
	RETURNING id,detail, transaction_status, transaction_id, created, updated`

	fmt.Printf("[ InsertOrder::entity ] %s \n", orderEntity.Detail)

	var db *sql.DB = database.Connect()

	defer db.Close()

	fmt.Println("[ InsertOrder::Query ]")

	row := db.QueryRow(sqlStatement, orderEntity.Detail, Status.PENDING)
	result := scan(row)

	fmt.Println("[ InsertOrder::completed ]")

	return result
}

func UpdateStatusByID(orderEntity OrderEntity) OrderEntity {
	return updateStatus("id="+string(orderEntity.ID), orderEntity.TransactionStatus)
}

func UpdateStatusByTransactionId(orderEntity OrderEntity) OrderEntity {
	return updateStatus("transaction_id='"+orderEntity.TransactionId+"'", orderEntity.TransactionStatus)
}

//________________________________________________
//PRIVATE
//________________________________________________
func updateStatus(where string, transactionStatus string) OrderEntity {
	fmt.Println("[ UpdateOrder ]")

	//if orderEntity.ID =lkk,ln8 = 0 {
	//	fmt.Println("[ UpdateOrder ] oborted")
	//return nil
	//}

	sqlStatement := `
	UPDATE public."order"
	SET 
		transaction_status='%s'
		,updated=now()
	WHERE 
		%s
	RETURNING 
		id, detail,transaction_status, transaction_id, created, updated
	`

	fmt.Printf("[ UpdateOrder::entity ] %s - %s \n", where, transactionStatus)

	var db *sql.DB = database.Connect()
	defer db.Close()

	fmt.Println("[ UpdateOrder::Query ]")

	row := db.QueryRow(fmt.Sprintf(sqlStatement, transactionStatus, where))
	result := scan(row)
	fmt.Println("[ UpdateOrder::completed ]")

	return result
}

func scan(row *sql.Row) OrderEntity {

	var result OrderEntity
	err := row.Scan(&result.ID, &result.Detail, &result.TransactionStatus, &result.TransactionId, &result.Created, &result.Updated)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Zero rows found")
		} else {
			panic(err)
		}
	}
	return result
}
