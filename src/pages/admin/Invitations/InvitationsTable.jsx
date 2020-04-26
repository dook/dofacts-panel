import React from 'react';
import PropTypes from 'prop-types';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@material-ui/core';

import styles from './InvitationsTable.module.scss';

const InvitationsTable = ({ invitations }) => {
  return (
    <Paper>
      <TableContainer>
        <Table aria-label="Tabela ze statusami zaproszeń">
          <TableHead>
            <TableRow>
              <TableCell>Adres e-mail</TableCell>
              <TableCell>Data wysłania</TableCell>
              <TableCell>Status zaproszenia</TableCell>
              <TableCell align="center">Status linku</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitations.map(item => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.email}
                </TableCell>
                <TableCell>{item.sent_at}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell align="center">
                  {item.expired ? (
                    <Tooltip title="Ważność linku wygasła">
                      <CancelIcon className={styles.statusExpired} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Link aktywny">
                      <CheckCircleIcon className={styles.statusActive} />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

InvitationsTable.propTypes = {
  invitations: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      expired: PropTypes.bool,
      id: PropTypes.string,
      sent_at: PropTypes.string,
      status: PropTypes.string
    })
  )
};

export default InvitationsTable;
