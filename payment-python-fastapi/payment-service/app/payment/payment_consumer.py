from app.payment import payment_service
from app.message_broker import consumer
import os


def consumer():
    consumer.observe(os.getenv("TOPIC_TRIGGER"),
                     payment_service.execute_payment)
    consumer.observe(os.getenv("TOPIC_COMPENSATION_TRIGGER"),
                     payment_service.compensation_payment)
