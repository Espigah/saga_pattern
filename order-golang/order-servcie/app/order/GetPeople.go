package order

import (
	"fmt"
	"net/http"
)

// GetPeople mostra todos os contatos da variável people
func GetPeople(w http.ResponseWriter, r *http.Request) {
	fmt.Println("people")
	fmt.Println(people3)
	//	json.NewEncoder(w).Encode(people)
}
