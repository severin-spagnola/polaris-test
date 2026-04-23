from pydantic import BaseModel


class ConfigEntry(BaseModel):
    key: str
    value: str


class PublicConfig(BaseModel):
    environment: str
    region: str
    default_currency: str
    request_rate_limit_per_minute: int
    flags: list[ConfigEntry]

