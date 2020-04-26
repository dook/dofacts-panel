import * as yup from 'yup';

export const yupCreatePassword = yup
  .string()
  .required()
  .min(8, 'Hasło nie może być krótsze niż 8 znaków.')
  .matches(/(?=.*[A-Z])/, 'Hasło musi posiadać co najmniej jedną wielką literę.')
  .matches(/(?=.*[0-9])/, 'Hasło musi posiadać co najmniej jedną cyfrę.')
  .matches(/(?=.*[!@#$%^&*])/, 'Hasło musi posiadać co najmniej jeden znak specjalny.');
