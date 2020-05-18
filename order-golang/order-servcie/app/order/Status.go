package order

type list struct {
	ABORTED string
	PENDING string
	BILLED  string
}

// Enum for public use
var Status = &list{
	ABORTED: "ABORTED",
	PENDING: "PENDING",
	BILLED:  "BILLED",
}
