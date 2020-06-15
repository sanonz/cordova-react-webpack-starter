import * as React from 'react';
import { render } from 'react-dom';
import Framework7 from 'framework7/framework7-lite.esm.bundle';
import Framework7React from 'framework7-react';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  const Sentry = require('@sentry/browser');
  Sentry.init({
    release: process.env.VERSION,
    dsn: 'https://8ba7a934ccb34715b6dc9fb9f09b695b@sentry.io/1274000'
  });
}

Framework7.use(Framework7React);

render(
  <App />,
  document.getElementById('app-root')
);
