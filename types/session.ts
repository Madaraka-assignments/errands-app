export type SessionPayload = {
  access_token: string
  refresh_token: string
  expiresAt: Date
}

export type LoginResponse = {
    success: string;
    token: string;
    user_id: number;
    fullname: string;
    user_type: string;
}
