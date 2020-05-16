package main

import (
	"fmt"
	"log"
	"net/http"

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
	router.HandleFunc("/order", order.GetPeople).Methods("GET")
	router.HandleFunc("/order/{id}", order.GetOrder).Methods("GET")
	router.HandleFunc("/order", order.CreateOrder).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func main() {

	setupRouter()
	fmt.Printf("[ setupRouter ]")
	messagebroker.Subscribe("ORDER_CREATE_EVENT", teste)

}
