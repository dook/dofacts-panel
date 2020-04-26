import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Title from 'components/Title';

import PasswordReset from './PasswordReset';
import Keywords from './Keywords';

import { rolesTypes } from 'consts';

const Settings = ({ role }) => {
  const { t } = useTranslation();
  const isAdmin = rolesTypes.ADMIN === role;

  return (
    <>
      <Title>{t('settings.title')}</Title>
      {isAdmin && <Keywords />}
      <PasswordReset />
    </>
  );
};

Settings.propTypes = {
  role: PropTypes.oneOf(Object.values(rolesTypes))
};

export default Settings;
