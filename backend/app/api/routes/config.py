from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import db_session
from app.config.policies import DEFAULT_CURRENCY, ENTERPRISE_ROLLOUT_REGION, REQUESTS_PER_MINUTE
from app.db.models import AppConfig
from app.schemas.config import ConfigEntry, PublicConfig

router = APIRouter(prefix="/config", tags=["config"])


@router.get("/public", response_model=PublicConfig)
def get_public_config(session: Session = Depends(db_session)) -> PublicConfig:
    entries = session.scalars(select(AppConfig).order_by(AppConfig.id)).all()
    return PublicConfig(
        environment=entries[0].environment,
        region=ENTERPRISE_ROLLOUT_REGION,
        default_currency=DEFAULT_CURRENCY,
        request_rate_limit_per_minute=REQUESTS_PER_MINUTE,
        flags=[
            ConfigEntry(key=entry.feature_flag_key, value=entry.feature_flag_value)
            for entry in entries
        ],
    )

