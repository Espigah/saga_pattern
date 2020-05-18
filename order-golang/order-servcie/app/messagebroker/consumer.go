package messagebroker

import (
	"context"
	"fmt"
	"os"

	"github.com/segmentio/kafka-go"
)

type Action func(string, func())

func Subscribe(topic string, action Action) {
	fmt.Println("[ Subscribe ]")
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{os.Getenv("MESSAGE_BROKER")},
		GroupID:  "consumer-group-id",
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})
	ctx := context.Background()
	for {
		m, err := r.FetchMessage(ctx)
		if err != nil {
			fmt.Printf(err.Error())
			break
		}

		commit := func() {
			r.CommitMessages(ctx, m)
			fmt.Println("[ Subscribe::CommitMessages ]")
		}
		fmt.Println("[ Subscribe ] receive message", m.Offset)
		action(string(m.Value), commit)
		//r.CommitMessages(ctx, m)
		//@TODO resetar o m.Offset (r.SetOffset)
	}

	r.Close()
}
