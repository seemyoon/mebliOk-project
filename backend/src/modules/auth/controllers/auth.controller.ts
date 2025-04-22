import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ROLES } from '../../user/decorators/roles.decorator';
import { UserEnum } from '../../user/enum/users.enum';
import { RolesGuard } from '../../user/guard/roles.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { ActionTokenGuard } from '../guards/action-token.guard';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IUserData } from '../interfaces/user-data.interface';
import { ChangePasswordReqDto } from '../models/dto/req/change-password.req.dto';
import { ResetPasswordChangeReqDto } from '../models/dto/req/reset-password-change.req.dto';
import { ResetPasswordSendReqDto } from '../models/dto/req/reset-password-send.req.dto';
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
  @Post('forgotPasswordSendEmail')
  public async forgotPasswordSendEmail(
    @Body() dto: ResetPasswordSendReqDto,
  ): Promise<void> {
    await this.authService.forgotPasswordSendEmail(dto);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(ActionTokenGuard)
  @Patch('forgotPasswordChange')
  public async forgotPasswordChange(
    @Body() dto: ResetPasswordChangeReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.authService.forgotPasswordChange(dto, userData);
  }

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  public async googleLogin(): Promise<void> {}

  @SkipAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  public async googleCallback(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.googleLogin(userData);
  }
}

// Client sends Authorization: Bearer ...
// JwtAccessGuard runs jwt-access strategy
// Strategy extracts token, verifies it and puts payload in req.user
// Decorator @CurrentUser() extracts req.user and returns to controller
