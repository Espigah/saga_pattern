package order

import (
	"os"
)

type topicList struct {
	TOPIC_SUCCESS              string
	TOPIC_CONCLUDE             string
	TOPIC_FAILURE              string
	TOPIC_TRIGGER              string
	TOPIC_COMPENSATION_TRIGGER string
	TOPIC_INFRA                string
}

// Enum for public use
var Topic = &topicList{
	TOPIC_SUCCESS:              os.Getenv("TOPIC_SUCCESS"),
	TOPIC_CONCLUDE:             os.Getenv("TOPIC_CONCLUDE"),
	TOPIC_FAILURE:              os.Getenv("TOPIC_FAILURE"),
	TOPIC_TRIGGER:              os.Getenv("TOPIC_TRIGGER"),
	TOPIC_COMPENSATION_TRIGGER: os.Getenv("TOPIC_COMPENSATION_TRIGGER"),
	TOPIC_INFRA:                os.Getenv("TOPIC_INFRA"),
}
