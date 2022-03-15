import {IUserState} from "./IUserState";

import {CLEAR_STATE, SAVE_USER} from "./actions";

const initialState : IUserState = {user: {}}
export function  reducer(state: IUserState = initialState, action : any){
  switch (action.type){
    case SAVE_USER:
      return Object.assign({}, state,{"user":  action.payload});
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
