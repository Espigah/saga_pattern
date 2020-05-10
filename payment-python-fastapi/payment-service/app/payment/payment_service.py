from app.payment import payment_repository
from app.message_broker import producer
from app.infra import infra_service
import os


def execute_payment(msg):
    print("[ execute_payment ]")
    try:

        if infra_service.is_database_enable():
            payment_repository.save(doc)

        if infra_service.is_broker_enable():
            producer.send_success()

    except:
        producer.send_failure()
        pass


def compensation_payment(msg):
    print("[ compensation_payment ]")
    pass

