import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { strings } from '../../services/constants/strings';

export const GetAuthorizedUser = createParamDecorator(
  (authorizedRole: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.loggedInUser)
      throw new UnauthorizedException('Authenticaiton required.');

    const loggedInRole = request.loggedInUser.role.identifier
    let allow: boolean = false;

    if (!authorizedRole) allow = true
    else if (authorizedRole === loggedInRole) allow = true
    else if (loggedInRole === strings.roles.SUPER_ADMIN) allow = true
    else if (loggedInRole === strings.roles.ADMIN && authorizedRole === strings.roles.EMPLOYEE) allow = true
    
    if (allow) return request.loggedInUser;
    throw new UnauthorizedException('Forbidden resource.'); 
  },
);
