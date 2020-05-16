package order

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

// GetOrder mostra apenas um contato
func GetOrder(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range people3 {
		if item.ID == params["id"] {
			fmt.Println(item)
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&OrderEntity{})
}
