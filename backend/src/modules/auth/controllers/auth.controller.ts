import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../decorators/current-user.decorator';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IUserData } from '../interfaces/user-data.interface';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sing-in')
  public async singIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @SkipAuth()
  @Post('sing-up')
  public async singUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @ApiBearerAuth()
  @Post('log-out')
  public async logOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.logOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refreshToken(userData);
  }

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  public async googleLogin() {}

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req) {
    console.log('googleAuthRedirect START:', req.user);
    await this.authService.googleAuthRedirect(req.user);
  }
}
