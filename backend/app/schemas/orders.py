from datetime import datetime

from pydantic import BaseModel, ConfigDict


class OrderSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_number: str
    user_id: int
    customer_name: str
    channel: str
    status: str
    currency: str
    total_cents: int
    placed_at: datetime

