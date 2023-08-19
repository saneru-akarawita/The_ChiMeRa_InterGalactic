import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import {  JwtRefreshPayload } from 'src/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.cookies?.refreshToken;
                },
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtRefreshPayload) {
        const refreshToken = req?.cookies?.refreshToken as string;
        // get the previously set expires time
        const refreshTokenExpireTime = Number(req?.cookies?.refreshTokenExpireTime as string);
        return { ...payload, refreshToken, refreshTokenExpireTime };
    }
}