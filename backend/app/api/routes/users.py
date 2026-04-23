from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import db_session
from app.db.models import Order, User
from app.schemas.users import UserDetail, UserSummary

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserSummary])
def list_users(session: Session = Depends(db_session)) -> list[UserSummary]:
    users = session.scalars(select(User).order_by(User.company, User.full_name)).all()
    summaries: list[UserSummary] = []
    for user in users:
        open_orders = session.scalar(
            select(func.count(Order.id)).where(Order.user_id == user.id, Order.status != "Packed")
        )
        summaries.append(
            UserSummary(
                id=user.id,
                full_name=user.full_name,
                email=user.email,
                company=user.company,
                status=user.status,
                timezone=user.timezone,
                account_tier=user.account_tier,
                last_active_at=user.last_active_at,
                open_orders=open_orders or 0,
            )
        )
    return summaries


@router.get("/{user_id}", response_model=UserDetail)
def get_user(user_id: int, session: Session = Depends(db_session)) -> UserDetail:
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    open_orders = session.scalar(
        select(func.count(Order.id)).where(Order.user_id == user.id, Order.status != "Packed")
    )
    return UserDetail(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        company=user.company,
        phone=user.phone,
        timezone=user.timezone,
        status=user.status,
        account_tier=user.account_tier,
        renewal_date=user.renewal_date,
        notes=user.notes,
        last_active_at=user.last_active_at,
        open_orders=open_orders or 0,
    )

