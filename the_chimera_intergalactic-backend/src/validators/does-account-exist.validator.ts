import { BadRequestException, Injectable } from '@nestjs/common';

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient, UserType } from '@prisma/client';

/**
 * To check if the email belongs to an existing user account
 * @param validationOptions
 * @constructor
 */
export function DoesAccoutnExist(userType: UserType, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: userType === 'ADMIN' ? DoesAccoutnExistValidationForAdmin : DoesAccoutnExistValidationForTraveler,
        });
    };
}

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class DoesAccoutnExistValidationForAdmin
    implements ValidatorConstraintInterface {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async validate(value: string): Promise<boolean> {
        return this.prisma.user
            .findFirst({ where: { email: value, user_type: 'ADMIN' } })
            .then((user) => {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            });
    }
}

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class DoesAccoutnExistValidationForTraveler
    implements ValidatorConstraintInterface {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async validate(value: string): Promise<boolean> {
        return this.prisma.user
            .findFirst({ where: { email: value, user_type: 'TRAVELER' } })
            .then((user) => {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            });
    }
}
