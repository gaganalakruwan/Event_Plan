import {runSaga} from 'redux-saga';
import {getPosts} from '../../redux/saga/api.saga';
import {
  startLoading,
  endLoading,
  setMessage,
} from '../../redux/action/SpinnerAction';
import Api from '../../services/apiService'; // Make sure to import your API module

// Mock the API call
jest.mock('../../redux/saga/api.saga');

describe('Post Saga', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock data before each test
  });

  it('should fetch all posts successfully', async () => {
    const dispatchedActions: any[] = [];

    // Mock the successful API response
    (Api.getAllPosts as jest.Mock).mockResolvedValue({
      data: [
        /* your mock posts data here */
      ],
    });

    const action = {
      type: 'GET_POSTS', // replace with your actual action type
      payload: {
        success: jest.fn(), // mock success function
        failed: jest.fn(), // mock failed function
      },
    };

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
        getState: () => ({}), // provide an empty initial state or your mock state
      },
      getPosts,
      action, // Pass the mock action here
    ).toPromise();

    // Check if success function was called
    expect(action.payload.success).toHaveBeenCalled();

    // Check the dispatched actions
    expect(dispatchedActions).toContainEqual(startLoading());
    expect(dispatchedActions).toContainEqual(setMessage('Loading Posts'));
    expect(dispatchedActions).toContainEqual(endLoading());
  });

  it('should handle API failure', async () => {
    const dispatchedActions: any[] = [];

    // Mock the API to throw an error
    (Api.getAllPosts as jest.Mock).mockRejectedValue(new Error('API Error'));

    const action = {
      type: 'GET_POSTS', // replace with your actual action type
      payload: {
        success: jest.fn(), // mock success function
        failed: jest.fn(), // mock failed function
      },
    };

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
        getState: () => ({}), // provide an empty initial state or your mock state
      },
      getPosts,
      action, // Pass the mock action here
    ).toPromise();

    // Check if failed function was called
    expect(action.payload.failed).toHaveBeenCalled();

    // Check the dispatched actions
    expect(dispatchedActions).toContainEqual(startLoading());
    expect(dispatchedActions).toContainEqual(endLoading());
  });
});
