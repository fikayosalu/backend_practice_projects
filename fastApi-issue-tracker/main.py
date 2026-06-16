from fastapi import FastAPI

from routes.issues import router as issues_router

app = FastAPI()

app.include_router(issues_router)
