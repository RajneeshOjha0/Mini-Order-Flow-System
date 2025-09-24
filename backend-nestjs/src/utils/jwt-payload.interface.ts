export interface JwtPayload {
  sub: number;
  mobile: string;
  iat?: number;
  exp?: number;
}
