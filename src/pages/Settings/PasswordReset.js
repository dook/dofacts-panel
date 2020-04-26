import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Typography, Paper } from '@material-ui/core';

import FormTextField from 'components/Forms/FormTextField';
import Alert from 'components/Alert';

import { userActions } from 'storages/user/actions';
import { yupCreatePassword } from 'utils/validation';

import styles from './Settings.module.scss';

const fields = {
  oldPassword: 'old_password',
  newPassword: 'password',
  repeatNewPassword: 'password2'
};

const initialValues = {
  [fields.oldPassword]: '',
  [fields.newPassword]: '',
  [fields.repeatNewPassword]: ''
};

const validationSchema = yup.object().shape({
  [fields.oldPassword]: yup.string().required(),
  [fields.newPassword]: yupCreatePassword,
  [fields.repeatNewPassword]: yup
    .string()
    .required()
    .oneOf([yup.ref(fields.newPassword)], 'Hasła muszą być takie same.')
});

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { passwordChange } = useSelector(({ user }) => ({
    passwordChange: user.passwordChange
  }));

  const handlePasswordChange = (values, { resetForm }) => {
    dispatch(userActions.changePassword(values, resetForm));
  };

  return (
    <Paper className={styles.passwordWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.passwordChange')}
      </Typography>
      <Typography variant="body2" className={styles.field}>
        {t('settings.passwordInstruction')}
      </Typography>

      <Alert showOn={passwordChange.error} className={styles.field}>
        {passwordChange.error}
      </Alert>
      <Alert showOn={passwordChange.data} className={styles.field} type="success">
        {passwordChange.data}
      </Alert>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePasswordChange}>
        <Form className={styles.form}>
          <FormTextField
            label={t('settings.actualPassword')}
            name="old_password"
            type="password"
            className={styles.field}
          />
          <FormTextField label={t('settings.newPassword')} name="password" type="password" className={styles.field} />
          <FormTextField
            label={t('settings.repeatNewPassword')}
            name="password2"
            type="password"
            className={styles.field}
          />
          <Button
            className={styles.field}
            variant="contained"
            color="primary"
            type="submit"
            disabled={passwordChange.isFetching}
          >
            {t('settings.passwordBtn')}
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

export default Settings;
