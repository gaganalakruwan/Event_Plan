import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import { auth } from 'utils/firebase';
import { startLoading, endLoading, setMessage } from '../../redux/action/SpinnerAction';
import { setUserData } from '../../redux/action/AuthActions';
import '@testing-library/jest-native/extend-expect';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('utils/firebase', () => ({
  auth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
  })),
}));
jest.mock('@react-native-firebase/firestore', () => ({
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ exists: true })),
    })),
  })),
}));

describe('Login Component', () => {
  const mockStore = configureStore([]);
  const mockNavigate = jest.fn();
  const mockSignInWithEmailAndPassword = auth().signInWithEmailAndPassword as jest.Mock;

  let store: any;

  beforeEach(() => {
    store = mockStore({});
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    mockSignInWithEmailAndPassword.mockClear();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('handles successful login', async () => {
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: 'Gagana@123', email: 'gagana@mail.com' },
    });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

  });

  it('handles login failure', async () => {
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText, queryByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
      expect(queryByText('Invalied Credentials')).toBeTruthy();
    });
  });
});
