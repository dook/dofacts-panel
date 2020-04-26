import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core';
import Title from 'components/Title';
import VerificationForm from 'components/VerificationForm';

import styles from './SubmissionDetails.module.scss';

const CheckersVerdicts = ({ checkersOpinions }) => {
  if (!checkersOpinions) {
    return null;
  }

  return (
    <>
      <Title component="h2">Werdykty społeczności</Title>
      {checkersOpinions.length > 0 ? (
        checkersOpinions.map((values, i) => (
          <VerificationForm key={i} title={`Werdykt fake huntera ${i + 1}`} values={values} disableForm />
        ))
      ) : (
        <Typography paragraph>Brak werdyktów fake hunterów.</Typography>
      )}
      <Divider className={styles.divider} />
    </>
  );
};

CheckersVerdicts.propTypes = {
  checkersOpinions: PropTypes.array
};

export default CheckersVerdicts;
