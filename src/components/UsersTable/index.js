import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@material-ui/core';

import styles from './UsersTable.module.scss';

const UsersTable = ({ data, optionsHeader, renderOptions }) => {
  const { t } = useTranslation();

  return (
    <Paper className={styles.container}>
      <TableContainer>
        <Table aria-label="experts table">
          <TableHead>
            <TableRow>
              <TableCell>{t('users.nameAndSurname')}</TableCell>
              <TableCell>{t('users.email')}</TableCell>
              <TableCell>{t('users.specialization')}</TableCell>
              <TableCell>{t('users.submissionsCount')}</TableCell>
              <TableCell>{t('users.registerDate')}</TableCell>
              <TableCell align="center">{optionsHeader}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Chip label={t(`specializationTypes.${item.specialization}`)} />
                </TableCell>
                <TableCell>
                  {item.verified} / {item.assigned}
                </TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="center">{renderOptions?.(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

UsersTable.propTypes = {
  data: PropTypes.array,
  optionsHeader: PropTypes.string,
  renderOptions: PropTypes.func
};

export default UsersTable;
