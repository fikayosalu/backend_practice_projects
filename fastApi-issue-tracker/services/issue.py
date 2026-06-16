from main import app


@app.get("/")
async def get_issue():
    return []
