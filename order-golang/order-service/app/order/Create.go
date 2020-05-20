package order

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// CreateOrder cria um novo contato
func Create(responseWriter http.ResponseWriter, request *http.Request) {
	fmt.Println("[ CreateOrder ]")
	body, _ := json.Marshal(request.Body)
	fmt.Println("[ CreateOrder ] Body=" + string(body))
	//params := mux.Vars(request)
	var orderEntity OrderEntity
	_ = json.NewDecoder(request.Body).Decode(&orderEntity)

	var result OrderEntity = Insert(orderEntity)

	WriteMessages(result, Topic.TOPIC_SUCCESS)

	json.NewEncoder(responseWriter).Encode(result)
}
