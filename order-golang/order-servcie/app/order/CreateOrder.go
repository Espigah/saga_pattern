package order

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// CreateOrder cria um novo contato
func CreateOrder(responseWriter http.ResponseWriter, request *http.Request) {
	fmt.Println("[ CreateOrder ]")
	fmt.Println("[POST]", request.Body)
	fmt.Println("[POST]", json.NewDecoder(request.Body))
	slcB, _ := json.Marshal(request.Body)
	fmt.Println(string(slcB))
	//params := mux.Vars(request)
	var orderEntity OrderEntity
	_ = json.NewDecoder(request.Body).Decode(&orderEntity)

	var result OrderEntity = InsertOrder(orderEntity)

	//	OrderEntity.ID = params["id"]
	json.NewEncoder(responseWriter).Encode(result)
}
