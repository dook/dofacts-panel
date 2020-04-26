import React from 'react';

import Route from 'base/containers/Route';
import Layout from 'base/containers/Layout';

import Experts from 'pages/admin/Experts';
import Checkers from 'pages/admin/Checkers';
import Invitations from 'pages/admin/Invitations';
import Submissions from 'pages/Submissions';
import History from 'pages/History';
import SubmissionDetails from 'pages/SubmissionDetails';
import Settings from 'pages/Settings';

import { appUrls } from 'urls';
import { rolesTypes } from 'consts';

const adminComponents = [
  { path: appUrls.DASHBOARD, component: Checkers, exact: true },
  { path: appUrls.EXPERTS, component: Experts, exact: true },
  { path: appUrls.INVITATIONS, component: Invitations, exact: true },
  { path: appUrls.SUBMISSIONS.LIST, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const expertComponents = [
  { path: appUrls.DASHBOARD, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.HISTORY.LIST, component: History, exact: true },
  { path: appUrls.HISTORY.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const checkerComponents = [
  { path: appUrls.DASHBOARD, component: Submissions, exact: true },
  { path: appUrls.SUBMISSIONS.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.HISTORY.LIST, component: History, exact: true },
  { path: appUrls.HISTORY.DETAILS, component: SubmissionDetails, exact: true },
  { path: appUrls.SETTINGS, component: Settings, exact: true }
];

const allComponents = new Map([
  [rolesTypes.ADMIN, adminComponents],
  [rolesTypes.EXPERT, expertComponents],
  [rolesTypes.CHECKER, checkerComponents]
]);

export const renderRoutes = userRole =>
  (allComponents.get(userRole) || []).map(({ component: Component, ...props }) => (
    <Route key={props.path} layout={Layout} authorized {...props}>
      <Component role={userRole} />
    </Route>
  ));
