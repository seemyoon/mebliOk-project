import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  handleRequest<TUser = any>(
    error: any,
    user: any,
    _info: any,
    context: ExecutionContext,
  ): TUser {
    const response = context.switchToHttp().getResponse();

    if (error || !user) {
      console.error(
        'Error during Google authentication:',
        error || 'No user returned',
      );
      throw error || new Error('Unauthorized');
    }

    console.log('User authenticated successfully:', user);

    response.redirect('/docs');
    // todo. when i have frontend, i should redirect to frontend url
    // todo. and pass access token and refresh token to local storage

    return user;
  }
}
