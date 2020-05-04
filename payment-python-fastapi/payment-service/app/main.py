
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import os
# from app.api.payment import payment
from app.payment import payment_service
from app.infra import infra_service

app = FastAPI()

fake_movie_db = [
    {
        'name': 'Star Wars: Episode IX - The Rise of Skywalker',
        'plot': 'The surviving members of the resistance face the First Order once again.',
        'genres': ['Action', 'Adventure', 'Fantasy'],
        'casts': ['Daisy Ridley', 'Adam Driver']
    }
]


class Movie(BaseModel):
    name: str
    plot: str
    genres: List[str]
    casts: List[str]


@app.get('/', response_model=List[Movie])
async def index():
    doc = {'name': 'Employee'}
    payment_service.execute_payment()  # Saving document
    return fake_movie_db


@app.post('/disable/broker')
async def disable_broker():
     infra_service.disable_broker();
     return True

@app.post('/disable/database')
async def disable_database():
     infra_service.disable_batabase();
     return True
