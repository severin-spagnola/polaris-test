from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import db_session
from app.db.models import Order, User
from app.schemas.dashboard import DashboardSummary, DashboardUserSnapshot, StatCard

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(session: Session = Depends(db_session)) -> DashboardSummary:
    active_users = session.scalar(select(func.count(User.id)).where(User.status == "Active")) or 0
    queued_orders = session.scalar(
        select(func.count(Order.id)).where(Order.status.in_(["Queued", "In Review", "Awaiting Payment"]))
    ) or 0
    gross_volume = session.scalar(select(func.sum(Order.total_cents))) or 0

    spotlight_users = session.scalars(select(User).order_by(User.last_active_at.desc()).limit(3)).all()
    recent_users = [
        DashboardUserSnapshot(
            id=user.id,
            full_name=user.full_name,
            company=user.company,
            account_tier=user.account_tier,
            status=user.status,
        )
        for user in spotlight_users
    ]

    return DashboardSummary(
        stats=[
            StatCard(label="Active users", value=str(active_users), trend="up 8% QoQ"),
            StatCard(label="Orders needing action", value=str(queued_orders), trend="down 3 today"),
            StatCard(label="Gross volume", value=f"${gross_volume / 100:,.0f}", trend="steady"),
        ],
        recent_users=recent_users,
    )

