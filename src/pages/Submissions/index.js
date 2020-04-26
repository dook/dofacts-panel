import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

import { submissionsActions } from 'storages/submissions/actions';
import { useQuery } from 'hooks/useQuery';
import { getSubmissionTitle } from 'utils/data';
import { rolesTypes } from 'consts';

import Title from 'components/Title';
import Suspense from 'components/Suspense';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import SubmissionCard from 'components/submissions/SubmissionCard';
import SubmissionsSkeleton from 'components/submissions/SubmissionsSkeleton';

import { FILTERS } from './consts';
import styles from './Submissions.module.scss';

const Submissions = ({ role }) => {
  const { t } = useTranslation();
  const query = useQuery();
  const dispatch = useDispatch();
  const { submissionsList } = useSelector(({ submissions }) => ({
    submissionsList: submissions.list
  }));

  useEffect(() => {
    dispatch(submissionsActions.list(role)(query));
    // eslint-disable-next-line
  }, [dispatch, role, JSON.stringify(query)]);

  const isEmpty = submissionsList.data?.results?.length === 0;

  return (
    <div className={styles.submissions}>
      <Title>{t('submissions.title')}</Title>
      <Filters filters={FILTERS[role]} withSearch />
      <Suspense waitFor={submissionsList} fallback={<SubmissionsSkeleton />}>
        {isEmpty && <Typography>{t('common.noResults')}</Typography>}
        {submissionsList.data?.results.map(
          ({
            id,
            url,
            screenshot_url,
            text,
            is_opined,
            reported_at,
            current_verdict,
            is_duplicate,
            is_sensitive,
            expertopinion,
            factcheckeropinion_set
          }) => (
            <SubmissionCard
              key={id}
              id={id}
              url={url}
              image={screenshot_url}
              text={text}
              reportDate={reported_at}
              hasOpinion={is_opined}
              verdict={current_verdict}
              isDuplicate={is_duplicate}
              isSensitive={is_sensitive}
              title={getSubmissionTitle(expertopinion, factcheckeropinion_set)}
            />
          )
        )}
        <Pagination total={submissionsList.data?.total} />
      </Suspense>
    </div>
  );
};

Submissions.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default Submissions;
