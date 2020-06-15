import { createContext, Dispatch } from 'react';
import type { Nullable, NUser } from '@/types/';

export interface NUserStoreAction {
  type: 'set' | 'merge' | 'remove';
  key?: string;
  value: any;
}

export type UserState = Nullable<NUser>;
export type UserDispatch = Dispatch<NUserStoreAction>;

const Context = createContext<[UserState, UserDispatch]>(null as any);
const Provider = Context.Provider;

function reducer(state: UserState, action: NUserStoreAction): UserState {
  let newState: UserState = null;

  switch (action.type) {
    case 'set':
      if (action.key) {
        newState = state ? {...state, [action.key]: action.value} : null;
      } else {
        newState = action.value;
      }
      break;

    case 'merge':
      Object.assign(newState, action.value);
      break;

    case 'remove':
      break;

    default:
      throw new Error();
  }

  if (newState) {
    localStorage.user = JSON.stringify(newState);
  } else {
    delete localStorage.user;
  }

  return newState;
}

export default Context;
export { Context, Provider, reducer };
