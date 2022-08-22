import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) throw new UnauthorizedException('Authenticaiton required.');

    return request.currentUser;
  }
)