package messagebroker

import (
	"context"
	"fmt"
	"os"

	"github.com/segmentio/kafka-go"
)

func WriteMessages(topic string, message string) {
	fmt.Println("[ WriteMessages ] " + topic)
	fmt.Println("[ WriteMessages ] " + message)
	producer := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{os.Getenv("MESSAGE_BROKER")},
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	})

	defer producer.Close()

	producer.WriteMessages(context.Background(),
		kafka.Message{
			Value: []byte(message),
		},
	)

}
