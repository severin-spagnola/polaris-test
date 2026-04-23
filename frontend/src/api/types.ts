export interface StatCard {
  label: string;
  value: string;
  trend: string;
}

export interface DashboardUserSnapshot {
  id: number;
  full_name: string;
  company: string;
  account_tier: string;
  status: string;
}

export interface DashboardSummary {
  stats: StatCard[];
  recent_users: DashboardUserSnapshot[];
}

export interface UserSummary {
  id: number;
  full_name: string;
  email: string;
  company: string;
  status: string;
  timezone: string;
  account_tier: string;
  last_active_at: string;
  open_orders: number;
}

export interface UserDetail extends UserSummary {
  phone: string;
  renewal_date: string;
  notes: string;
}

export interface OrderSummary {
  id: number;
  order_number: string;
  user_id: number;
  customer_name: string;
  channel: string;
  status: string;
  currency: string;
  total_cents: number;
  placed_at: string;
}

export interface ConfigEntry {
  key: string;
  value: string;
}

export interface PublicConfig {
  environment: string;
  region: string;
  default_currency: string;
  request_rate_limit_per_minute: number;
  flags: ConfigEntry[];
}

