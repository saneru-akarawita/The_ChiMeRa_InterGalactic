import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import type { JwtPayload, JwtRefreshPayload } from 'src/types';
import { AuthService } from './auth.service';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateTravelerDto } from 'src/users/dto/create-traveler.dto';
import { AdminLoginDto, TravelerLoginDto } from './dto/login.dto';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @FormDataRequest()
  async createTraveler(
    @Body() createTravelerDto: CreateTravelerDto,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signUpTraveler(
      createTravelerDto,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() loginDto: TravelerLoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signInTraveler(
      loginDto,
    );

    const { remember_me } = loginDto;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      // 7 day expiration or if remember_me is true, 1 year expiration
      maxAge: remember_me ? 365 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
    });

    // set a cookie mentioning the expire time of the refresh token to later check if it was a remember me login or regular login
    res.cookie(
      'refreshTokenExpireTime',
      remember_me ? 365 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
      {
        httpOnly: true,
        path: '/',
        // 7 day expiration or if remember_me is true, 1 year expiration
        maxAge: remember_me
          ? 365 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000,
      },
    );

    res.send({ accessToken });
  }

  @Post('admin-signup')
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signUpAdmin(
      createAdminDto,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      // 7 day expiration
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ accessToken });
  }

  @Post('admin-signin')
  async signinAdmin(@Body() loginDto: AdminLoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signInAdmin(
      loginDto,
    );

    const { remember_me } = loginDto;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      // 7 day expiration or if remember_me is true, 1 year expiration
      maxAge: remember_me ? 365 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
    });

    // set a cookie mentioning the expire time of the refresh token to later check if it was a remember me login or regular login
    res.cookie(
      'refreshTokenExpireTime',
      remember_me ? 365 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
      {
        httpOnly: true,
        path: '/',
        // 7 day expiration or if remember_me is true, 1 year expiration
        maxAge: remember_me
          ? 365 * 24 * 60 * 60 * 1000
          : 7 * 24 * 60 * 60 * 1000,
      },
    );

    res.send({ accessToken });
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtPayload;
    this.authService.logout(user.id);
    res.cookie('refreshToken', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    res.cookie('refreshTokenExpireTime', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    res.send({ message: 'Logged out successfully' });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtRefreshPayload;
    const refreshToken = user['refreshToken'];
    const userId = user['id'];
    const expireTime = user['refreshTokenExpireTime'];
    const { accessToken, refreshToken: refresh_token } =
      await this.authService.refreshTokens(userId, refreshToken);

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: expireTime,
    });

    res.cookie('refreshTokenExpireTime', expireTime, {
      httpOnly: true,
      path: '/',
      maxAge: expireTime,
    });

    res.send({ accessToken });
  }
}
