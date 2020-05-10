from app.payment import payment_service
from app.message_broker.consumer import observe
import os


def consumer():
    try:
        payment = (
            os.getenv("TOPIC_TRIGGER"),
            payment_service.execute_payment
        )

        compensation = (
            os.getenv("TOPIC_COMPENSATION_TRIGGER"),
            payment_service.compensation_payment
        )
        
        observe([payment, compensation])

    except Exception as e:
        print(e)
        pass
