export interface LoginPayload {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface RefreshPayload {
  refresh_token: string;
}
