import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';

import Suspense from 'components/Suspense';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import InvitationsTable from './InvitationsTable';

const Invitations = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const { error, isFetching, data } = useSelector(({ admin }) => admin.invitations);

  useEffect(() => {
    dispatch(adminActions.invitations(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(query)]);

  return (
    <>
      <Title>{t('invitations.title')}</Title>
      <Suspense waitFor={{ data, isFetching, error }}>
        <InvitationsTable invitations={data?.results || []} />
        <Pagination total={data?.total} pageSize={data?.page_size} />
      </Suspense>
    </>
  );
};

export default Invitations;
