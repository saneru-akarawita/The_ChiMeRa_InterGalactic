import { UserType } from '@prisma/client';

export type JwtPayload = {
  id: string;
  userType: UserType;
};

export type JwtRefreshPayload = {
  id: string;
  userType: UserType;
  refreshToken: string;
  refreshTokenExpireTime: number;
};
