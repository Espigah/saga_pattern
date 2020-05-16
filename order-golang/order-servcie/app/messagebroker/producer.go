package messagebroker

import (
	"context"
	"fmt"

	"github.com/segmentio/kafka-go"
)

func WriteMessages() {
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{"kafka:9092"},
		Topic:    "ORDER_CREATE_EVENT",
		Balancer: &kafka.LeastBytes{},
	})

	fmt.Println(w)
	w.WriteMessages(context.Background(),
		kafka.Message{
			Key:   []byte("Key-A"),
			Value: []byte("Hello World!"),
		},
		kafka.Message{
			Key:   []byte("Key-B"),
			Value: []byte("One!"),
		},
		kafka.Message{
			Key:   []byte("Key-C"),
			Value: []byte("Two!"),
		},
	)

	w.Close()
}
