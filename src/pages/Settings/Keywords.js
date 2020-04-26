import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Button, Typography, Paper, Chip } from '@material-ui/core';

import { submissionsActions } from 'storages/submissions/actions';
import FormTextField from 'components/Forms/FormTextField';
import Alert from 'components/Alert';
import Suspense from 'components/Suspense';

import styles from './Settings.module.scss';

const fields = {
  keyword: 'name'
};

const initialValues = {
  [fields.keyword]: ''
};

const validationSchema = yup.object().shape({
  [fields.keyword]: yup.string().required()
});

const Keywords = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { keywords, add, remove } = useSelector(({ submissions }) => ({
    keywords: submissions.keywords.list,
    add: submissions.keywords.add,
    remove: submissions.keywords.remove
  }));

  useEffect(() => {
    dispatch(submissionsActions.keywords.list());
  }, [dispatch]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(submissionsActions.keywords.add(values, resetForm));
  };

  const handleDelete = id => () => {
    dispatch(submissionsActions.keywords.remove(id));
  };

  return (
    <Paper className={styles.keywordsWrapper}>
      <Typography variant="h6" component="h2">
        {t('settings.sensitiveWords')}
      </Typography>

      <Alert showOn={add.error}>{add.error}</Alert>
      <Alert showOn={remove.error}>{remove.error}</Alert>

      <Suspense waitFor={keywords}>
        <ul className={styles.keywordsList}>
          {keywords.data?.results?.map(word => (
            <li key={word.id}>
              <Chip label={word.name} onDelete={handleDelete(word.id)} />
            </li>
          ))}
        </ul>
      </Suspense>

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form className={styles.keywordsForm}>
          <FormTextField label={t('settings.newSensitiveWords')} name={fields.keyword} />
          <Button
            className={styles.addBtn}
            type="submit"
            color="primary"
            variant="contained"
            size="small"
            disabled={add.isFetching}
          >
            {t('settings.addBtn')}
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

export default Keywords;
