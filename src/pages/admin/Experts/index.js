import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import { Button, IconButton } from '@material-ui/core';

import { useQuery } from 'hooks/useQuery';
import { adminActions } from 'storages/admin/actions';
import { specializationOptions } from 'consts';

import Suspense from 'components/Suspense';
import UserTable from 'components/UsersTable';
import Filters, { ALL_OPTIONS } from 'components/Filters';
import Title from 'components/Title';
import Pagination from 'components/Pagination';
import AddUserModal from 'components/AddUserModal';

import styles from './Experts.module.scss';

const FILTERS = [
  {
    name: 'specialization',
    label: 'Specjalizacja',
    defaultValue: ALL_OPTIONS.value,
    options: [ALL_OPTIONS, ...specializationOptions]
  }
];

const Experts = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { experts, add, update } = useSelector(({ admin }) => ({
    experts: admin.experts,
    add: admin.add,
    update: admin.update
  }));

  useEffect(() => {
    dispatch(adminActions.experts(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, JSON.stringify(query), update.data]);

  const openModal = () => {
    dispatch(adminActions.clearAddUser());
    setOpen(true);
  };

  const handleStatusChange = (id, nextActive) => () => {
    dispatch(adminActions.updateUser(id, { is_active: nextActive }));
  };

  const handleSubmit = ({ email }) => {
    dispatch(adminActions.addUser({ email, user_role: 'expert' }));
  };

  return (
    <>
      <Title>Eksperci</Title>
      <Filters filters={FILTERS}>
        <Button onClick={openModal} className={styles.addButton} variant="contained" color="primary">
          Dodaj eksperta
        </Button>
      </Filters>
      <Suspense waitFor={experts}>
        <UserTable
          data={experts.data?.results || []}
          optionsHeader="Dezaktywuj"
          renderOptions={({ id, is_active }) => (
            <IconButton
              title={is_active ? 'Dezaktywuj' : 'Aktywuj'}
              aria-label={is_active ? 'Dezaktywuj' : 'Aktywuj'}
              className={cx(!is_active && styles.bannedBtn)}
              onClick={handleStatusChange(id, !is_active)}
            >
              <RemoveIcon />
            </IconButton>
          )}
        />
        <Pagination total={experts.data?.total} />
      </Suspense>
      <AddUserModal
        title="Dodaj eksperta"
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

export default Experts;
