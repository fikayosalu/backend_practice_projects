from fastapi import FastAPI
from pydantic import BaseModel, Field

# Initialize FastApi
app = FastAPI()


class ContactMessage(BaseModel):
    """This class creates a model for the
    request body and is validated by fastapi"""

    name: str
    email: str
    message: str = Field(min_length=10)
    subject: str = "General Inquiry"


@app.post("/contact")
def contact(contact_message: ContactMessage):
    """Accepts a request body and returns the message info"""
    return {"status": "success", "info": f"{contact_message.message}"}
