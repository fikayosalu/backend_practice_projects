from datetime import datetime

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    return {"status": "success", "message": "Welcome to FastApi"}


@app.get("/greet/{name}")
def greet(name: str):
    return {"status": "success", "message": f"Hi there {name}, welcome🙂"}


@app.get("/time")
def get_time():
    return datetime.now()
