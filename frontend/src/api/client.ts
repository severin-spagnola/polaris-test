import type {
  DashboardSummary,
  OrderSummary,
  PublicConfig,
  UserDetail,
  UserSummary,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

export function getDashboardSummary() {
  return fetchJson<DashboardSummary>("/dashboard/summary");
}

export function getUsers() {
  return fetchJson<UserSummary[]>("/users");
}

export function getUser(userId: string) {
  return fetchJson<UserDetail>(`/users/${userId}`);
}

export function getOrders() {
  return fetchJson<OrderSummary[]>("/orders");
}

export function getPublicConfig() {
  return fetchJson<PublicConfig>("/config/public");
}

