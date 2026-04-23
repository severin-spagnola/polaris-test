from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import db_session
from app.db.models import Order
from app.schemas.orders import OrderSummary

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=list[OrderSummary])
def list_orders(session: Session = Depends(db_session)) -> list[OrderSummary]:
    orders = session.scalars(select(Order).order_by(Order.placed_at.desc())).all()
    return [
        OrderSummary(
            id=order.id,
            order_number=order.order_number,
            user_id=order.user_id,
            customer_name=order.customer_name,
            channel=order.channel,
            status=order.status,
            currency=order.currency,
            total_cents=order.total_cents,
            placed_at=order.placed_at,
        )
        for order in orders
    ]

