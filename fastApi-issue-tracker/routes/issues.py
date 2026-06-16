from fastapi import APIRouter
from services.issue import get_issue

router = APIRouter(prefix="/api/issues", tags=["issues"])


@router.get("/")
async def get_issues():
    return await get_issue()
