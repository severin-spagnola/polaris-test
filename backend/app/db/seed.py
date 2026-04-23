from datetime import datetime, timedelta

from sqlalchemy import select

from app.db.models import AppConfig, Order, User
from app.db.session import SessionLocal


def seed_database() -> None:
    with SessionLocal() as session:
        existing_user = session.scalar(select(User.id).limit(1))
        if existing_user is not None:
            return

        now = datetime.utcnow()
        users = [
            User(
                id=101,
                full_name="Avery Chen",
                email="avery.chen@northbeamlogistics.com",
                company="Northbeam Logistics",
                phone="+1 415 555 0112",
                timezone="America/Los_Angeles",
                status="Active",
                account_tier="Enterprise",
                renewal_date="2026-09-30",
                notes="Runs weekly executive review for the west coast rollout.",
                last_active_at=now - timedelta(minutes=18),
            ),
            User(
                id=102,
                full_name="Mina Patel",
                email="mina.patel@stackharbor.io",
                company="StackHarbor",
                phone="+1 646 555 0180",
                timezone="America/New_York",
                status="Active",
                account_tier="Growth",
                renewal_date="2026-11-15",
                notes="Owns API integrations and order routing setup.",
                last_active_at=now - timedelta(hours=3, minutes=5),
            ),
            User(
                id=103,
                full_name="Jonas Meyer",
                email="jonas.meyer@paperlane.co",
                company="Paperlane",
                phone="+49 30 555 0199",
                timezone="Europe/Berlin",
                status="Needs Review",
                account_tier="Starter",
                renewal_date="2026-06-18",
                notes="Pilot customer still finalizing approval workflow.",
                last_active_at=now - timedelta(days=1, hours=2),
            ),
        ]
        orders = [
            Order(
                id=5001,
                order_number="NO-10482",
                user_id=101,
                customer_name="Northbeam Logistics",
                channel="Portal",
                status="Packed",
                currency="USD",
                total_cents=184000,
                placed_at=now - timedelta(hours=1, minutes=10),
            ),
            Order(
                id=5002,
                order_number="NO-10483",
                user_id=101,
                customer_name="Northbeam Logistics",
                channel="EDI",
                status="In Review",
                currency="USD",
                total_cents=76500,
                placed_at=now - timedelta(hours=3, minutes=25),
            ),
            Order(
                id=5003,
                order_number="NO-10484",
                user_id=102,
                customer_name="StackHarbor",
                channel="Sales Assist",
                status="Queued",
                currency="USD",
                total_cents=44250,
                placed_at=now - timedelta(hours=5, minutes=4),
            ),
            Order(
                id=5004,
                order_number="NO-10485",
                user_id=103,
                customer_name="Paperlane",
                channel="Portal",
                status="Awaiting Payment",
                currency="EUR",
                total_cents=22900,
                placed_at=now - timedelta(days=1, minutes=40),
            ),
        ]
        config_rows = [
            AppConfig(
                id=1,
                environment="production",
                region="us-west-2",
                fulfillment_mode="assisted",
                feature_flag_key="priority_order_routing",
                feature_flag_value="enabled",
            ),
            AppConfig(
                id=2,
                environment="production",
                region="us-west-2",
                fulfillment_mode="assisted",
                feature_flag_key="customer_health_banner",
                feature_flag_value="enabled",
            ),
        ]

        session.add_all(users + orders + config_rows)
        session.commit()

