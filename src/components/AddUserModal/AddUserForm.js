import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import FormTextField from 'components/Forms/FormTextField';

import styles from './AddUserModal.module.scss';

const fields = {
  email: 'email'
};

const initialValues = {
  [fields.email]: ''
};

const validationSchema = yup.object().shape({
  [fields.email]: yup
    .string()
    .required()
    .email()
});

const AddUserForm = ({ onClose, onSubmit, isFetching, error }) => {
  const { t } = useTranslation();

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <DialogContent>
          <FormTextField className={styles.field} name={fields.email} type="email" label={t('fields.email')} />
          {error && (
            <Typography align="center" color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('common.cancel')}
          </Button>
          <Button color="primary" type="submit" variant="contained" disabled={isFetching}>
            {t('users.addBtn')}
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};

AddUserForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  isFetching: PropTypes.bool,
  error: PropTypes.string
};

export default AddUserForm;
