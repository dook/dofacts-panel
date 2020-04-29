import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '@material-ui/core';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';
import { specializationOptions } from 'consts';

import Suspense from 'components/Suspense';
import UserTable from 'components/UsersTable';
import Filters, { ALL_OPTIONS } from 'components/Filters';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import AddUserModal from 'components/AddUserModal';
import TableOptions from './TableOptions';

import styles from './Checkers.module.scss';

const FILTERS = [
  {
    name: 'specialization',
    i18nkey: 'filters.specialization',
    label: 'Specjalizacja',
    defaultValue: ALL_OPTIONS.value,
    options: [ALL_OPTIONS, ...specializationOptions]
  }
];

const Checkers = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { checkers, add, update } = useSelector(({ admin }) => ({
    checkers: admin.checkers,
    add: admin.add,
    update: admin.update
  }));

  useEffect(() => {
    dispatch(adminActions.checkers(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(query), update.data]);

  const openModal = () => {
    dispatch(adminActions.clearAddUser());
    setOpen(true);
  };

  const handleSubmit = ({ email }) => {
    dispatch(adminActions.addUser({ email, user_role: 'fact_checker' }));
  };

  const handleStatusChange = (id, nextActive) => {
    dispatch(adminActions.updateUser(id, { is_active: nextActive }));
  };

  const handlePromoteClick = id => {
    dispatch(adminActions.updateUser(id, { role: 'expert' }));
  };

  return (
    <>
      <Title>{t('community.title')}</Title>
      <Filters filters={FILTERS}>
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          {t('community.addUser')}
        </Button>
      </Filters>
      <Suspense waitFor={checkers}>
        <UserTable
          data={checkers.data?.results || []}
          optionsHeader={t('community.options')}
          renderOptions={user => (
            <TableOptions
              id={user.id}
              isActive={user.is_active}
              onStatusChange={handleStatusChange}
              onPromoteClick={handlePromoteClick}
            />
          )}
        />
        <Pagination total={checkers.data?.total} />
      </Suspense>

      <AddUserModal
        title={t('community.addUser')}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        data={add.data}
        error={add.error}
        isFetching={add.isFetching}
      />
    </>
  );
};

export default Checkers;
