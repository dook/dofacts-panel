import PropTypes from 'prop-types';
import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@material-ui/core';
import { specializationTypes } from 'consts';
import styles from './UsersTable.module.scss';

const UsersTable = ({ data, optionsHeader, renderOptions }) => {
  return (
    <Paper className={styles.container}>
      <TableContainer>
        <Table aria-label="experts table">
          <TableHead>
            <TableRow>
              <TableCell>Imię i nazwisko</TableCell>
              <TableCell>Adres e-mail</TableCell>
              <TableCell>Specjalizacja</TableCell>
              <TableCell>Zgłoszenia zweryfikowane/przyznane</TableCell>
              <TableCell>Data rejestracji</TableCell>
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
                  <Chip label={specializationTypes[item.specialization]} />
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
