import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import { submissionsActions } from 'storages/submissions/actions';
import { useQuery } from 'hooks/useQuery';
import { getSubmissionTitle } from 'utils/data';
import Title from 'components/Title';
import Suspense from 'components/Suspense';
import Pagination from 'components/Pagination';
import Filters from 'components/Filters';
import SubmissionCard from 'components/submissions/SubmissionCard';
import SubmissionsSkeleton from 'components/submissions/SubmissionsSkeleton';

import { rolesTypes } from 'consts';
import { FILTERS } from './consts';
import styles from './History.module.scss';

const History = ({ role }) => {
  const { t } = useTranslation();
  const query = useQuery();
  const dispatch = useDispatch();
  const { history } = useSelector(({ submissions }) => ({
    history: submissions.history
  }));

  useEffect(() => {
    dispatch(submissionsActions.history.list(query));
    // eslint-disable-next-line
  }, [dispatch, JSON.stringify(query)]);

  const isEmpty = history.data?.results?.length === 0;

  return (
    <div className={styles.history}>
      <Title>{t('history.title')}</Title>
      <Filters filters={[...FILTERS.ALL, ...(FILTERS[role] || [])]} withSearch />
      <Suspense waitFor={history} fallback={<SubmissionsSkeleton />}>
        {isEmpty && <Typography>{t('history.noResults')}</Typography>}
        {history.data?.results.map(item => (
          <SubmissionCard
            key={item.id}
            id={item.id}
            url={item.url}
            image={item.screenshot_url}
            text={item.text}
            title={getSubmissionTitle(item.expertopinion, item.factcheckeropinion_set)}
            reportDate={item.reported_at}
            verdict={item.current_verdict}
            isDuplicate={item.is_duplicate}
            isHistory={true}
          />
        ))}
        <Pagination total={history.data?.total} />
      </Suspense>
    </div>
  );
};

History.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default History;
