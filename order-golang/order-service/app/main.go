package main

import (
	"fmt"
	"log"
	"net/http"

	"./messagebroker"
	"./order"

	"github.com/gorilla/mux"
)

func setupRouter() {
	fmt.Printf("[ setupRouter ]")
	router := mux.NewRouter()
	router.HandleFunc("/order", order.Create).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func main() {

	go messagebroker.Subscribe(order.Topic.TOPIC_TRIGGER, order.CreateListener(order.Status.BILLED, order.Topic.TOPIC_CONCLUDE))
	go messagebroker.Subscribe(order.Topic.TOPIC_COMPENSATION_TRIGGER, order.CreateListener(order.Status.ABORTED, ""))

	setupRouter()
}
