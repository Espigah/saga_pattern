package order

import (
	"encoding/json"
	"fmt"

	"../messagebroker"
)

func WriteMessages(entity OrderEntity, topic string) {
	fmt.Println("[ Order::WriteMessages ] " + topic)

	if topic == "" {
		fmt.Println("[ Order::WriteMessages::aborted ]")
		return
	}

	message, _ := json.Marshal(entity)
	messagebroker.WriteMessages(topic, string(message))
}
