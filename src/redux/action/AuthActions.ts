import {SET_USER_DATA} from '../../constant/reduxConstants';

export const setUserData = (data: any) => ({
  type: SET_USER_DATA,
  payload: data,
});
