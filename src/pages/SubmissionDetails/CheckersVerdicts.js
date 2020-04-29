import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Typography, Divider } from '@material-ui/core';
import Title from 'components/Title';
import VerificationForm from 'components/VerificationForm';

import styles from './SubmissionDetails.module.scss';

const CheckersVerdicts = ({ checkersOpinions }) => {
  const { t } = useTranslation();

  if (!checkersOpinions) {
    return null;
  }

  return (
    <>
      <Title component="h2">{t('details.factCheckerVerdictTitle')}</Title>
      {checkersOpinions.length > 0 ? (
        checkersOpinions.map((values, i) => (
          <VerificationForm key={i} title={`${t('details.factCheckerVerdict')} ${i + 1}`} values={values} disableForm />
        ))
      ) : (
        <Typography paragraph>{t('details.noFactCheckerVerdict')}</Typography>
      )}
      <Divider className={styles.divider} />
    </>
  );
};

CheckersVerdicts.propTypes = {
  checkersOpinions: PropTypes.array
};

export default CheckersVerdicts;
