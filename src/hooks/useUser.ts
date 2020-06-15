import { useContext } from 'react';

import { Context, UserState, UserDispatch } from '@/stores/userStore';

function useUser(): [UserState, UserDispatch] {
  return useContext(Context);
}

export default useUser;
