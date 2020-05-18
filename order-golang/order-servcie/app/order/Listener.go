package order

import (
	"encoding/json"
	"fmt"

	"../messagebroker"
)

func CreateListener(status string) messagebroker.Action {
	return func(action string, commit func()) {
		fmt.Println("[ CompensateListener ]")
		fmt.Println(action)

		byt := []byte(action)

		var orderEntity OrderEntity
		json.Unmarshal(byt, &orderEntity)

		orderEntity.TransactionStatus = status

		UpdateStatusByTransactionId(orderEntity)

		commit()
	}

}
