import {IUserState} from "./IUserState";

export const   SAVE_USER = 'SAVE_USER';
export const   CLEAR_STATE = 'CLEAR_STATE';

export function saveUser(user: IUserState){

  return {
    type: SAVE_USER,
    payload: user
  }

}

export function clear(){
  return {
    type: CLEAR_STATE,
    payload: {}
  }
}
