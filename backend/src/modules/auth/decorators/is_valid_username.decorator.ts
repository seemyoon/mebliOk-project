import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { IsEmail, IsPhoneNumber } from '../../../common/utils';

export function IsEmailOrPhone(validationsOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailOrPhone',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationsOptions,
      validator: {
        validate(value: any, _validationArguments?: ValidationArguments) {
          return IsEmail(value) || IsPhoneNumber(value);
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${validationArguments.property} must be a valid email or phone number`;
        },
      },
    });
  };
}
