from pydantic import BaseModel


class StatCard(BaseModel):
    label: str
    value: str
    trend: str


class DashboardUserSnapshot(BaseModel):
    id: int
    full_name: str
    company: str
    account_tier: str
    status: str


class DashboardSummary(BaseModel):
    stats: list[StatCard]
    recent_users: list[DashboardUserSnapshot]

