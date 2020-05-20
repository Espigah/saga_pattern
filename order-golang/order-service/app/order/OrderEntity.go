package order

type OrderEntity struct {
	ID                int    `bson:"id,omitempty" json:"id,omitempty"`
	Detail            string `bson:"detail,omitempty" json:"detail,omitempty"`
	TransactionStatus string `bson:"transaction_status,omitempty" json:"transaction_status,omitempty"`
	TransactionId     string `bson:"transaction_id,omitempty" json:"transaction_id,omitempty"`
	Created           string `bson:"created,omitempty" json:"created,omitempty"`
	Updated           string `bson:"updated,omitempty" json:"updated,omitempty"`
}
