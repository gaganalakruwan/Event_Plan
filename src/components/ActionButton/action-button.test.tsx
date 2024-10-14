import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from './index'; // Update the path if necessary

describe('ActionButton Component', () => {
  it('should render the title correctly', () => {
    const { getByText } = render(
      <ActionButton title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress function when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ActionButton title="Press" onPress={mockOnPress} testId="action-button" />
    );

    fireEvent.press(getByTestId('action-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

});
