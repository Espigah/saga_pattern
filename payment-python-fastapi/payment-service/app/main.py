
from fastapi import FastAPI
from typing import List
import os
from app.infra import infra_service
from app.payment import payment_consumer
app = FastAPI()



@app.post('/disable/broker')
async def disable_broker():
    infra_service.disable_broker()
    return True


@app.post('/disable/database')
async def disable_database():
    infra_service.disable_database()
    return True

payment_consumer.consumer()