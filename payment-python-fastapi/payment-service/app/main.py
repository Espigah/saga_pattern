
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import os
# from app.api.payment import payment
from app.payment import payment_service

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
    payment_service.execute_payment()  # Saving document
    return fake_movie_db
