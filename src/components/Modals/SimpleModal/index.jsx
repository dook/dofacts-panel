import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Modal, Box, Button } from '@material-ui/core';
import Decoration from 'components/Decoration';

import styles from './SimpleModal.module.scss';

const SimpleModal = ({ message, isOpen, onClose, hideButton }) => {
  return (
    <Modal className={styles.container} open={!!isOpen} onClick={onClose}>
      <Box className={styles.content} boxShadow={3}>
        <div className={styles.body}>
          {message}
          {!hideButton && (
            <Button className={styles.button} onClick={onClose} variant="contained" color="primary">
              Zamknij
            </Button>
          )}
        </div>
        <Decoration className={cx(styles.decoration, { [styles.noButton]: hideButton })} />
      </Box>
    </Modal>
  );
};

SimpleModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  hideButton: PropTypes.bool,
  isOpen: PropTypes.bool
};

export default SimpleModal;
