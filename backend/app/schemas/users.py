from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: str
    company: str
    status: str
    timezone: str
    account_tier: str
    last_active_at: datetime
    open_orders: int


class UserDetail(UserSummary):
    phone: str
    renewal_date: str
    notes: str

