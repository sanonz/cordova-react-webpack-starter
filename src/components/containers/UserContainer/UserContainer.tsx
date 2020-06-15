import * as React from 'react';

import { Provider } from '@/stores/userStore';
import { useUserStore } from './hooks';

export interface Props { }

function UserContainer({ children }: React.PropsWithChildren<Props>): JSX.Element {
  const [state, dispatch] = useUserStore();

  return (
    <Provider value={[state, dispatch]}>
      {children}
    </Provider>
  );
}

export default UserContainer;
