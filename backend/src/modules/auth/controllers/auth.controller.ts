import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CurrentUser } from '../decorators/current-user.decorator';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IUserData } from '../interfaces/user-data.interface';
import { ChangePasswordReqDto } from '../models/dto/req/change-password.req.dto';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';

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
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
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

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ROLES(UserEnum.MANAGER, UserEnum.ADMIN, UserEnum.REGISTERED_CLIENT)
  @Post('changePassword')
  public async changePassword(
    @CurrentUser() userData: IUserData,
    @Body() dto: ChangePasswordReqDto,
  ): Promise<void> {
    await this.authService.changePassword(userData, dto);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @Post('forgotPassword')
  public async forgotPasswordSendEmail(
    @CurrentUser() userData: IUserData,
    @Body() dto: ForgotPasswordReqDto,
  ): Promise<void> {
    await this.authService.forgotPasswordSendasdmail(userData, dto);
  }

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  public async googleLogin(): Promise<void> {}

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() request: Request): Promise<void> {
    await this.authService.googleCallback(request);
  }
}
