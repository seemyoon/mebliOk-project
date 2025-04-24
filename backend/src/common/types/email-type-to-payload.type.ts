import { EmailTypeEnum } from '../../modules/mail/enum/email.enum';
import { EmailPayloadCombinedType } from './email-payload-combined.type';
import { PickRequiredType } from './pick-required.type';

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequiredType<
    EmailPayloadCombinedType,
    'name' | 'actionToken'
  >;
  [EmailTypeEnum.VERIFY_EMAIL]: PickRequiredType<
    EmailPayloadCombinedType,
    'name' | 'actionToken'
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequiredType<EmailPayloadCombinedType, 'name'>;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequiredType<
    EmailPayloadCombinedType,
    'name' | 'email' | 'actionToken'
  >;
};
