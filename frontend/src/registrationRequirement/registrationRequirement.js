import { object, string, ref } from 'yup';

export const channelNamesShema = (channelNames, t) => object({
  name: string()
    .trim()
    .min(3, t('modal.validation.range'))
    .max(20, t('modal.validation.range'))
    .notOneOf(channelNames, t('modal.validation.notOneOf'))
    .required(t('modal.validation.required')),
});

export const signUpShema = (t) => object({
  username: string()
    .trim()
    .min(3, t('registrationForm.errors.usernameRange'))
    .max(20, t('registrationForm.errors.usernameRange'))
    .required(t('registrationForm.errors.required')),
  password: string()
    .trim()
    .min(6, t('registrationForm.errors.passwordRange'))
    .required(t('registrationForm.errors.required')),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password')], t('registrationForm.errors.passwordConfirm'))
    .required(t('registrationForm.errors.required')),
});
