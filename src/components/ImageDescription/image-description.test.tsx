import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import ImageDescription from './index';

describe('ImageDescription', () => {
  it('renders the image with correct URI', () => {
    const {getByTestId} = render(
      <ImageDescription
        imageUri="https://example.com/image.jpg"
        title="Sample Title"
        description="Sample Description"
      />,
    );

    const image = getByTestId('imageComponent');
    expect(image.props.source.uri).toBe('https://example.com/image.jpg'); // Check if URI is correctly passed
  });

  it('renders the title correctly', () => {
    const {getByTestId} = render(
      <ImageDescription
        imageUri="https://example.com/image.jpg"
        title="Sample Title"
        description="Sample Description"
      />,
    );

    const titleText = getByTestId('titleText');
    expect(titleText.props.children).toBe('Sample Title'); // Check if title is rendered correctly
  });

  it('renders the description with limited lines', () => {
    const {getByTestId} = render(
      <ImageDescription
        imageUri="https://example.com/image.jpg"
        title="Sample Title"
        description="Sample Description"
      />,
    );

    const descriptionText = getByTestId('descriptionText');
    expect(descriptionText.props.children).toBe('Sample Description'); // Check if description is rendered correctly
    expect(descriptionText.props.numberOfLines).toBe(4); // Ensure the description is limited to 4 lines
  });
});
