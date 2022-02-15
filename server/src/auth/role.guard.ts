import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";
import { ROLE_KEY } from "./roles.decorator";
import { decode } from 'jsonwebtoken';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRoles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token: string = request.headers.authorization?.split(' ')[1];
        if(!token){
            return false;
        }
        const user: any = decode(token)

        return requiredRoles.some(role => user.roles?.includes(role));
    }
}