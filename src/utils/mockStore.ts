import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

// Define a custom type that extends MockStoreEnhanced
interface ExtendedMockStore extends MockStoreEnhanced<any, {}> {
  getDispatchedActions: () => any[];
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const mockStoreCreator = configureStore(middlewares);

export const mockStore = (initialState = {}): ExtendedMockStore => {
  const store = mockStoreCreator(initialState) as ExtendedMockStore;

  // Array to track dispatched actions
  const dispatchedActions: any[] = [];
  
  // Override the dispatch function to track dispatched actions
  store.dispatch = jest.fn((action) => {
    dispatchedActions.push(action);
    return action;
  });

  // Method to get the dispatched actions
  store.getDispatchedActions = () => dispatchedActions;

  return store;
};
