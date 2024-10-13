import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  getImages: ['payload'],
  getUsers: ['payload'],
  getPosts: ['payload'],
  getComments: ['payload'],
});
export const CommonTypes = Types;
export const CommonActions = Creators;
