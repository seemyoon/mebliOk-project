import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    console.log('CurrentUser:', req.res.locals.user);
    return req.res.locals.user;
  },
);
