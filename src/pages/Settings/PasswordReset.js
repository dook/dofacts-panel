import React from 'react';
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
        Zmiana hasła
      </Typography>
      <Typography variant="body2" className={styles.field}>
        Nowe hasło powinno zawierać: co najmniej 8 znaków, minimum jedną wielką literę, minimum jedną cyfrę, minimum
        jeden znak specjalny
      </Typography>

      <Alert showOn={passwordChange.error} className={styles.field}>
        {passwordChange.error}
      </Alert>
      <Alert showOn={passwordChange.data} className={styles.field} type="success">
        {passwordChange.data}
      </Alert>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePasswordChange}>
        <Form className={styles.form}>
          <FormTextField label="Aktualne hasło" name="old_password" type="password" className={styles.field} />
          <FormTextField label="Nowe hasło" name="password" type="password" className={styles.field} />
          <FormTextField label="Powtórz nowe hasło" name="password2" type="password" className={styles.field} />
          <Button
            className={styles.field}
            variant="contained"
            color="primary"
            type="submit"
            disabled={passwordChange.isFetching}
          >
            Zmień hasło
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

export default Settings;
