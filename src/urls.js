import { rolesTypes } from 'consts';

export const apiUrls = {
  AUTH: {
    SIGN_UP: '/users/sign-up/:token',
    LOGIN: '/users/login',
    PASSWORD_RESET_REQUEST: '/users/reset-password-request',
    PASSWORD_RESET: '/users/reset-password/:id/:token'
  },
  USER: {
    DETAILS: '/users/current-user',
    CHANGE_PASSWORD: '/users/internal-reset-password'
  },
  ADMIN: {
    ADD_USER: '/users/send-invite',
    INVITATIONS: '/admin/invitations',
    KEYWORDS: '/admin/keywords',
    KEYWORDS_DETAILS: '/admin/keywords/:id',
    EXPERTS_LIST: '/admin/experts',
    CHECKERS_LIST: '/admin/fact-checkers',
    UPDATE_USER: '/admin/users/:id'
  },
  SUBMISSIONS: {
    HISTORY: {
      LIST: '/api/news_verified/',
      DETAILS: '/api/news_verified/:id/'
    },
    [rolesTypes.CHECKER]: {
      LIST: '/api/fact_checker/news/',
      DETAILS: '/api/fact_checker/news/:id/',
      VERIFY: '/api/fact_checker/news/:id/create_opinion/'
    },
    [rolesTypes.EXPERT]: {
      LIST: '/api/expert/news/',
      DETAILS: '/api/expert/news/:id/',
      VERIFY: '/api/expert/news/:id/create_opinion/'
    },
    [rolesTypes.ADMIN]: {
      LIST: '/admin/news',
      DETAILS: '/admin/news/:id'
    }
  }
};

export const appUrls = {
  DASHBOARD: '/',
  REGISTER: '/register/:token',
  LOGIN: '/login',
  PASSWORD_RESET_REQUEST: '/reset-password',
  PASSWORD_RESET: '/reset-password/:id/:token',
  EXPERTS: '/experts',
  INVITATIONS: '/invitations',
  SUBMISSIONS: {
    DETAILS: '/submissions/:id',
    LIST: '/submissions'
  },
  HISTORY: {
    LIST: '/history',
    DETAILS: '/history/:id'
  },
  SETTINGS: '/settings',
  NOT_FOUND: '/404/',
  NOT_READY: '/#'
};

export const outerUrls = {
  CHECKER_FORM:
    'https://zgloszenia.govtech.gov.pl/ankieta/512297/dolacz-do-korpusu-ludzi-walczacych-z-dezinformacja-towarzyszaca-epidemii-koronawirusa.html?fbclid=IwAR00LUCwzbZ4szwf2YO7cvg74BA1KswfdtPIPs1_m4RayGlJjs43J4Q-5co'
};
