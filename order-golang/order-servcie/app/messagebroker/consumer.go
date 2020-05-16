package messagebroker

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

type action func(string)

func Subscribe(topic string, action action) {
	fmt.Println("[ Subscribe ]")
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{"kafka:9092"},
		GroupID:  "consumer-group-id",
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			fmt.Printf(err.Error())
			break
		}
		fmt.Println("[ Subscribe ] receive message")
		action(string(m.Value))
	}

	r.Close()
}
