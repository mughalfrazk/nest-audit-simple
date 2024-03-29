import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request?.user?.id) request.loggedInUser = await this.userService.findOne(request?.user?.id, ['client_assignments.company', 'client_assignments.action']);

    return handler.handle();
  }
}
