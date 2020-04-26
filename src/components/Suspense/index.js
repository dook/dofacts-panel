import React from 'react';
import PropTypes from 'prop-types';

import Alert from 'components/Alert';
import Loader from 'components/Loader';

import styles from './Suspense.module.scss';

const Suspense = ({ waitFor, children, fallback }) => {
  const success = !waitFor.isFetching && !waitFor.error && waitFor.data;
  const isError = !waitFor.isFetching && waitFor.error;
  return waitFor.isFetching ? (
    fallback || <Loader />
  ) : isError ? (
    <Alert showOn={true} variant="filled" className={styles.error}>
      {waitFor.error || 'Wystąpił błąd'}
    </Alert>
  ) : success ? (
    <>{children}</>
  ) : null;
};

Suspense.propTypes = {
  waitFor: PropTypes.shape({
    isFetching: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  }).isRequired,
  children: PropTypes.node,
  fallback: PropTypes.node
};

export default Suspense;
