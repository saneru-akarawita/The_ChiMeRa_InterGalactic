import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidType', async: false })
export class IsValidTypeConstraint implements ValidatorConstraintInterface {
  validate(type: string, args: ValidationArguments) {
    return args.constraints[0].includes(type) ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid type';
  }
}

export function IsValidType(
  property: Array<string>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsValidTypeConstraint,
    });
  };
}
