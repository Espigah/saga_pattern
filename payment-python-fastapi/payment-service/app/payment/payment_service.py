from app.payment import payment_repository
from app.message_broker import producer
from app.infra import infra_service
import os
import json
import calendar
import time


def execute_payment(value, commit):
    print("[ execute_payment ]", value)

    if value is None or "detail" not in value or "transaction_id" not in value:
        print("[ execute_payment ] invalid payload")
        producer.send_failure(value)
        return

    try:

        if infra_service.is_database_enable():
            doc = {
                "status": "PENDING",
                "timestamp": calendar.timegm(time.gmtime())
            }
            doc.update(value)
            print("[ execute_payment::save ]", value)
            save_result = payment_repository.save(doc)
        else:
            raise Exception('database disabled')

        if infra_service.is_broker_enable():
            print("[ execute_payment::send_success ]")
            producer.send_success(doc)
            new_doc = {}
            new_doc.update(doc)
            new_doc.update({'_id': save_result[0], '_rev': save_result[1], 'status': 'EMITTED',
                            'updated': calendar.timegm(time.gmtime())})
            print("[ execute_payment::update ]")
            payment_repository.update(new_doc)
            commit()
        else:
            raise Exception('broker disabled')

    except Exception as e:
        print("[ execute_payment::failure ] ", e)
        producer.send_failure(doc)
        pass


def compensation_payment(value, commit):
    print("[ compensation_payment ]", value)

    try:
        if value is None or "transaction_id" not in value:
            print("[ compensation_payment ] invalid payload")
            producer.send_failure()
            return

        payment_repository.delete(value['transaction_id'])

        commit()
        print("[ compensation_payment ]", "ok")
    except Exception as identifier:
        print("[ compensation_payment::Error ]", identifier)
        pass
