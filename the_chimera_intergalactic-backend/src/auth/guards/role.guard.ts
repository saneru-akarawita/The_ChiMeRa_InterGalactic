import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient, UserType } from '@prisma/client';
import { Request } from 'express'
import { JwtPayload } from 'src/types';


@Injectable()
export class RolesGuard implements CanActivate {

    prisma: PrismaClient

    constructor(private reflector: Reflector) {
        this.prisma = new PrismaClient()
    }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<UserType[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as Request;
        const user = request.user as JwtPayload;
        const loggedInUser = await this.prisma.user.findUnique({ where: { id: user.id } })
        if(!loggedInUser) return false
        return roles.includes(loggedInUser.user_type);
    }
}