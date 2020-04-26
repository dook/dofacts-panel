import 'base/i18n';
import 'base/yup';

import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core';

import history from 'base/history';
import configureStore from 'base/redux/configureStore';
import Root from 'base/containers/Root';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0075e2',
      dark: '#0052a5'
    },
    secondary: {
      main: '#FF4081'
    },
    error: {
      main: '#d5233f',
      dark: '#a7162d'
    },
    success: {
      main: '#4caf50'
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <Root store={store} history={history} />
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
