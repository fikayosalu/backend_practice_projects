from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str = Field(min_length=10, description="Length must be greater than 9")
    subject: str = "General Inquiry"


@app.post("/contact")
def contact(contact_message: ContactMessage):
    return {"status": "success", "info": f"{contact_message.message}"}
