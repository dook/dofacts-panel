import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { Button, Typography, Paper } from '@material-ui/core';
import Title from 'components/Title';
import FormTextField from 'components/Forms/FormTextField';
import FormCheckbox from 'components/Forms/FormCheckbox';
import FormRadio from 'components/Forms/FormRadio';
import styles from './VerificationForm.module.scss';

const getUUIDFromUrl = url => {
  return url.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)?.[0];
};

const VERDICT_OPTIONS = [
  {
    label: 'Prawda',
    value: 'true'
  },
  {
    label: 'Fake News',
    value: 'false'
  },
  {
    label: 'Nieweryfikowalne',
    value: 'unidentified'
  },
  {
    label: 'Spam',
    value: 'spam'
  }
];

const ABOUT_CORONAVIRUS_OPTIONS = [
  {
    label: 'Tak',
    value: 'true'
  },
  {
    label: 'Nie',
    value: 'false'
  }
];

const fields = {
  isDuplicated: 'is_duplicate',
  duplicateReference: 'duplicate_reference',
  title: 'title',
  aboutCoronaVirus: 'about_corona_virus',
  verdict: 'verdict',
  comment: 'comment',
  confirmationSources: 'confirmation_sources'
};

const getInitialValues = (values = {}) => ({
  [fields.isDuplicated]: false,
  [fields.title]: '',
  [fields.verdict]: '',
  [fields.comment]: '',
  [fields.confirmationSources]: '',
  ...values,
  [fields.aboutCoronaVirus]: values[fields.aboutCoronaVirus] ? String(values[fields.aboutCoronaVirus]) : '',
  [fields.duplicateReference]: values[fields.duplicateReference] || ''
});

const MIN_VERDICT_LENGTH = 500;

const validationSchema = yup.object().shape({
  [fields.isDuplicated]: yup.boolean().required('Określ, czy zgłoszenie jest duplikatem'),
  [fields.duplicateReference]: yup.string().when(fields.isDuplicated, {
    is: true,
    then: yup
      .string()
      .url()
      .required('Podaj link do zduplikowanego zgłoszenia'),
    otherwise: yup.string()
  }),
  [fields.title]: yup.string().when([fields.isDuplicated, fields.verdict], {
    is: (duplicate, verdict) => !duplicate && verdict !== 'spam',
    then: yup.string().required('Nadaj tytuł temu zgłoszeniu')
  }),
  [fields.aboutCoronaVirus]: yup.boolean().when([fields.isDuplicated, fields.verdict], {
    is: (duplicate, verdict) => !duplicate && verdict !== 'spam',
    then: yup.boolean().required('Określ, czy dotyczy koronawirusa'),
    otherwise: yup.boolean()
  }),
  [fields.verdict]: yup.string().when(fields.isDuplicated, {
    is: false,
    then: yup.string().required('Wskaż swój werdykt'),
    otherwise: yup.string()
  }),
  [fields.comment]: yup.string().when([fields.isDuplicated, fields.verdict], {
    is: (duplicate, verdict) => !duplicate && verdict !== 'spam',
    then: yup
      .string()
      .min(MIN_VERDICT_LENGTH, 'Uzasadnienie nie może być krótsze niż 500 znaków')
      .required('Uzasadnij swój werdykt'),
    otherwise: yup.string()
  }),
  [fields.confirmationSources]: yup.string().when([fields.isDuplicated, fields.verdict], {
    is: (duplicate, verdict) => !duplicate && verdict !== 'spam',
    then: yup.string().required('Podaj wykorzystane źródła')
  })
});

const VerificationForm = ({ title, values, onSubmit, isSubmitting, error, disableForm }) => {
  const [isDuplicated, setDuplicated] = useState(false);
  const [commentLetterNumber, setCommentLetterNumber] = useState(0);

  useEffect(() => {
    if (values) {
      setDuplicated(values[fields.isDuplicated]);
    }
  }, [values]);

  const handleChangeDuplicated = value => {
    setDuplicated(value);
  };

  const handleSubmit = ({ [fields.duplicateReference]: duplicateUrl, ...restValues }) => {
    let payload = restValues;
    if (duplicateUrl) {
      payload = {
        [fields.isDuplicated]: restValues[fields.isDuplicated],
        [fields.duplicateReference]: getUUIDFromUrl(duplicateUrl)
      };
    } else if (restValues[fields.verdict] === 'spam') {
      payload = {
        [fields.verdict]: restValues[fields.verdict]
      };
    }
    onSubmit(payload);
  };

  const handleCommentChange = (e, setFieldValue) => {
    const comment = e.target.value;
    const commentLength = Array.from(comment).length;
    setFieldValue(fields.comment, comment, true);
    setCommentLetterNumber(commentLength);
  };

  const isFieldDisableCommon = isDuplicated || disableForm;

  return (
    <Paper className={styles.container} variant="outlined">
      <Title component="h3">{title || 'Formularz weryfikacji'}</Title>
      <Formik initialValues={getInitialValues(values)} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <FormCheckbox
              className={styles.field}
              name={fields.isDuplicated}
              label="Zgłoszenie zduplikowane"
              onChange={handleChangeDuplicated}
              disabled={disableForm}
            />
            <FormTextField
              className={cx(styles.field, { [styles.hidden]: !isDuplicated })}
              name={fields.duplicateReference}
              disabled={!isDuplicated || disableForm}
              label="Link do zgłoszenia"
              helperText={
                !(!isDuplicated || disableForm) &&
                `Link z naszego systemu np. ${window.location.origin}/submissions/e06339c3-3a43-444e-908b-1ba02f9397a4`
              }
            />
            <FormTextField
              className={cx(styles.field, { [styles.hidden]: isDuplicated })}
              name={fields.title}
              label="Tytuł"
              disabled={isFieldDisableCommon}
              helperText={
                !isFieldDisableCommon &&
                'Wpisz tytuł w formie pytania, np. „Czy zwierzęta domowe mogą być nosicielami koronawirusa?”'
              }
            />
            <FormRadio
              className={cx(styles.field, { [styles.hidden]: isDuplicated })}
              name={fields.aboutCoronaVirus}
              options={ABOUT_CORONAVIRUS_OPTIONS}
              label="Dotyczy koronawirusa"
              disabled={isFieldDisableCommon}
            />
            <FormRadio
              className={cx(styles.field, { [styles.hidden]: isDuplicated })}
              name={fields.verdict}
              options={VERDICT_OPTIONS}
              label="Twój werdykt"
              disabled={isFieldDisableCommon}
            />
            <FormTextField
              multiline
              rows={10}
              className={cx(styles.field, { [styles.hidden]: isDuplicated })}
              name={fields.comment}
              label="Uzasadnienie"
              onChange={e => handleCommentChange(e, setFieldValue)}
              disabled={isFieldDisableCommon}
            />
            {!isFieldDisableCommon && (
              <div className={styles.letterCounter}>
                Liczba znaków: <span>{commentLetterNumber}</span>
              </div>
            )}

            <FormTextField
              multiline
              rows={4}
              className={cx(styles.field, { [styles.hidden]: isDuplicated })}
              name={fields.confirmationSources}
              label="Źródła"
              disabled={isFieldDisableCommon}
              helperText={!isFieldDisableCommon && 'Podaj źródła, na których opierasz swój werdykt'}
            />
            {!disableForm && (
              <>
                <div className={styles.actions}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Zweryfikuj zgłoszenie
                  </Button>
                </div>
                {error && <Typography color="error">{error}</Typography>}
              </>
            )}
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

VerificationForm.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  values: PropTypes.object,
  isSubmitting: PropTypes.bool,
  error: PropTypes.string,
  disableForm: PropTypes.bool
};

export default VerificationForm;
