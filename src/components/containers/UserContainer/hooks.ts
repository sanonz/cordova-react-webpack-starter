import { useReducer, useEffect } from 'react';
import type { Nullable, NUser } from '@/types/';

import { reducer, UserState, UserDispatch } from '@/stores/userStore';

function useUserStore(): [UserState, UserDispatch] {
  const [state, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    let userData: Nullable<NUser> = null;
    if (localStorage.user) {
      try {
        userData = JSON.parse(localStorage.user);
      } catch (err) {
        delete localStorage.user;
      }
    }
    if (userData) {
      dispatch({ type: 'set', value: userData });
    }
  }, []);

  return [state, dispatch];
}

export { useUserStore };
