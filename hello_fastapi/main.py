import random
from datetime import datetime

from fastapi import FastAPI

app = FastAPI()

quotes = [
    "One day hungry man go chop",
    "Rain wey beat me today go wash my Benz tomorrow",
    "It gets a little easier everyday, but you have to do it everyday",
]


@app.get("/")
def home():
    return {"status": "success", "message": "Welcome to FastApi"}


@app.get("/greet/{name}")
def greet(name: str):
    return {"status": "success", "message": f"Hi there {name}, welcome🙂"}


@app.get("/time")
def get_time():
    return datetime.now()


@app.get("/quote")
def get_quote(index: int = None):
    quote = random.choice(quotes)
    if index is None or index > 2:
        return {"status": "success", "message": quote}
    return {"status": "success", "message": quotes[index]}
