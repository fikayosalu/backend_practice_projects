import random
from datetime import datetime

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()


class ContactMessage(BaseModel):
    """This class creates a model for the
    request body and is validated by fastapi"""

    name: str
    email: str
    message: str = Field(min_length=10)
    subject: str = "General Inquiry"


quotes = [
    "One day hungry man go chop",
    "Rain wey beat me today go wash my Benz tomorrow",
    "It gets a little easier everyday, but you have to do it everyday",
]


@app.get("/")
def home():
    """This function is for the root url.
    It returns a greeting message on success"""
    return {"status": "success", "message": "Welcome to FastApi"}


@app.get("/greet/{name}")
def greet(name: str):
    """This function return a personalized greeting message
    based on the path parameter provided"""
    return {"status": "success", "message": f"Hi there {name}, welcome🙂"}


@app.get("/time")
def get_time():
    """Returns the current sever time"""
    return datetime.now()


@app.get("/quote")
def get_quote(index: int = None):
    """Accepts an integer query parameter and returns the a quote from
    the quotes array using the parameter as an index.
    If no parameter is provided it returns a random quote"""
    quote = random.choice(quotes)
    if index is None or index > 2:
        return {"status": "success", "message": quote}
    return {"status": "success", "message": quotes[index]}


@app.post("/contact")
def contact(contact_message: ContactMessage):
    """Accepts a request body and returns the message info"""
    return {"status": "success", "info": f"{contact_message.message}"}
