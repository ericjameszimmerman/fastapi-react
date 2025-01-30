from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.auth_handler import get_current_active_user
from database import get_db
from models import User
from schemas import UserResponse

router = APIRouter()

@router.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user