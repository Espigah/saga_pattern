package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"./messagebroker"
	"./order"

	"github.com/gorilla/mux"
)

func teste(value string) {
	fmt.Printf("teste = %s\n", value)
}

func setupRouter() {
	fmt.Printf("[ setupRouter ]")
	router := mux.NewRouter()
	router.HandleFunc("/order", order.Create).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func main() {

	go messagebroker.Subscribe(os.Getenv("TOPIC_TRIGGER"), order.CreateListener(order.Status.BILLED))
	go messagebroker.Subscribe(os.Getenv("TOPIC_COMPENSATION_TRIGGER"), order.CreateListener(order.Status.ABORTED))

	setupRouter()
}
