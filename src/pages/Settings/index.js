import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/Title';

import PasswordReset from './PasswordReset';
import Keywords from './Keywords';

import { rolesTypes } from 'consts';

const Settings = ({ role }) => {
  const isAdmin = rolesTypes.ADMIN === role;

  return (
    <>
      <Title>Ustawienia</Title>
      {isAdmin && <Keywords />}
      <PasswordReset />
    </>
  );
};

Settings.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default Settings;
