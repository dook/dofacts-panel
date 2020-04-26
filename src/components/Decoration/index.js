import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './Decoration.module.scss';

const Decoration = ({ className }) => {
  const classes = cx(styles.Decoration, className);

  return (
    <div className={classes}>
      <div className={styles.decorationA} />
      <div className={styles.decorationB} />
      <div className={styles.decorationC} />
    </div>
  );
};

Decoration.propTypes = {
  className: PropTypes.string
};

export default Decoration;
