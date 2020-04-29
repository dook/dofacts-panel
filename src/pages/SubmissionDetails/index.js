import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';

import { appUrls } from 'urls';
import { submissionsActions } from 'storages/submissions/actions';
import Title from 'components/Title';
import Suspense from 'components/Suspense';
import DisplaySubmissionDetails from 'components/submissions/SubmissionDetails';
import VerificationForm from 'components/VerificationForm';
import { rolesTypes } from 'consts';
import Skeleton from './Skeleton';
import CheckersVerdicts from './CheckersVerdicts';
import styles from './SubmissionDetails.module.scss';

const SubmissionDetails = ({ role }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    path,
    params: { id }
  } = useRouteMatch();
  /* TODO: we need to think more about architecture of app
   * and how things should be splitted for now it's done as it for speed up release
   */
  const isHistoryPage = path === appUrls.HISTORY.DETAILS;
  const isAdmin = role === rolesTypes.ADMIN;

  const { submission, submissionVerification } = useSelector(({ submissions }) => ({
    submissionVerification: submissions.verify,
    submission: submissions.details
  }));

  useEffect(() => {
    if (isHistoryPage) {
      dispatch(submissionsActions.history.details(id));
    } else {
      dispatch(submissionsActions.details(role)(id));
    }
  }, [dispatch, id, role, isHistoryPage]);

  const handleSubmit = payload => {
    dispatch(submissionsActions.verify(role)(id, payload));
  };

  const handleRemove = () => {
    dispatch(submissionsActions.remove(id));
  };

  const handleRecover = () => {
    dispatch(submissionsActions.remove(id, false));
  };

  const isOpined = submissionVerification.data?.id === id || submission.data?.is_opined;
  const showEditableForm = !isOpined && !isHistoryPage && !isAdmin;
  const expertOpinion = submission.data?.expertopinion;

  return (
    <div className={styles.container}>
      <Title>{t('details.title')}</Title>
      <Suspense waitFor={submission} fallback={<Skeleton />}>
        <DisplaySubmissionDetails submission={submission.data} />
      </Suspense>

      <CheckersVerdicts checkersOpinions={submission.data?.factcheckeropinion_set} />

      {isOpined && (
        <div className={styles.successContainer}>
          <div className={styles.successText}>
            <CheckCircleOutlineIcon color="inherit" />
            <span>{t('details.formSent')}</span>
          </div>
          <div className={styles.successText}>
            <Button component={Link} to={appUrls.DASHBOARD} color="primary">
              {t('details.backToList')}
            </Button>
          </div>
        </div>
      )}

      {submission.data &&
        (expertOpinion ? (
          <VerificationForm title={t('details.expertVerdict')} values={expertOpinion} disableForm />
        ) : (
          showEditableForm && (
            <VerificationForm
              onSubmit={handleSubmit}
              isSubmitting={submissionVerification.isFetching}
              error={submissionVerification.error}
            />
          )
        ))}

      {isAdmin && (
        <div className={styles.removeWrapper}>
          {submission.data?.deleted ? (
            <>
              <Typography>{t('details.submissionRemoved')}</Typography>
              <Button onClick={handleRecover} color="primary" startIcon={<RestoreIcon />}>
                {t('details.recoverBtn')}
              </Button>
            </>
          ) : (
            <Button onClick={handleRemove} color="secondary" startIcon={<DeleteIcon />}>
              {t('details.removeBtn')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

SubmissionDetails.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default SubmissionDetails;
