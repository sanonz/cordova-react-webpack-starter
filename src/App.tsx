import * as React from 'react';
import { hot } from 'react-hot-loader';
import { App as Framework, View } from 'framework7-react';

import routes from './routes';
import styles from '@/app.less';
import useStyles from '@/hooks/useStyles';

function App() {
  useStyles(styles);

  const params = {
    id: 'com.newbox.courier',
    theme: 'auto',
  }

  return (
    <Framework
      params={params}
      routes={routes}
    >
      <View
        main
        url="/"
        pushState={true}
        pushStateSeparator=""
      />
    </Framework>
  );
}

export default hot(module)(App);
