import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box } from '@material-ui/core';

import styles from './Lightbox.module.scss';

const Lightbox = ({ isOpen, onClose, url }) => {
  return (
    <Modal open={isOpen} onClose={onClose} className={styles.container}>
      <Box className={styles.content}>
        <img alt="" src={url} className={styles.image} />
      </Box>
    </Modal>
  );
};

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  url: PropTypes.string
};

export default Lightbox;
