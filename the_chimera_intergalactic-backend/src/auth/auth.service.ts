import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { CreateTravelerDto } from 'src/users/dto/create-traveler.dto';
import { UsersService } from 'src/users/users.service';
import { AdminLoginDto, TravelerLoginDto } from './dto/login.dto';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUpTraveler(createTravelerDto: CreateTravelerDto) {
    // Check if user exists
    const createdTraveler = await this.usersService.createTraveler(
      createTravelerDto,
    );
    const tokens = await this.getTokens(createdTraveler.id);
    await this.updateRefreshToken(createdTraveler.id, tokens.refreshToken);
    return tokens;
  }

  async signInTraveler({ email, password }: TravelerLoginDto) {
    // Check if traveler exists
    const traveler = await this.usersService.getTravelerByEmail(email);
    if (!traveler)
      throw new BadRequestException({
        errorMessages: [
          { property: 'system', errors: ['Something went wrong'] },
        ],
        message: 'Bad Request',
        statusCode: 400,
      });
    const passwordMatches = await compare(password, traveler.password);
    if (!passwordMatches)
      throw new BadRequestException({
        errorMessages: [
          { property: 'pasword', errors: ['Password does not match'] },
        ],
        message: 'Bad Request',
        statusCode: 400,
      });
    const tokens = await this.getTokens(traveler.id);
    await this.updateRefreshToken(traveler.id, tokens.refreshToken);
    return tokens;
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    // Check if user exists
    const createdAdmin = await this.usersService.createAdmin(createAdminDto);
    const tokens = await this.getTokens(createdAdmin.id);
    await this.updateRefreshToken(createdAdmin.id, tokens.refreshToken);
    return tokens;
  }

  async signInAdmin({ email, password }: AdminLoginDto) {
    // Check if admin exists
    const admin = await this.usersService.getAdminByEmail(email);
    if (!admin)
      throw new BadRequestException({
        errorMessages: [
          { property: 'system', errors: ['Something went wrong'] },
        ],
        message: 'Bad Request',
        statusCode: 400,
      });
    const passwordMatches = await compare(password, admin.password);
    if (!passwordMatches)
      throw new BadRequestException({
        errorMessages: [
          { property: 'pasword', errors: ['Password does not match'] },
        ],
        message: 'Bad Request',
        statusCode: 400,
      });
    const tokens = await this.getTokens(admin.id);
    await this.updateRefreshToken(admin.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 12);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async getTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
