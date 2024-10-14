import 'react-native';
import React from 'react';

import {render} from '@testing-library/react-native';
import CommentBox from './index';

describe('CommentBox', () => {
  it('Render Comment Component Correctly', () => {
    const {getByTestId} = render(
      <CommentBox email={'test@gmail.com'} body={'Sample Comment'} />,
    );

    const emailText = getByTestId('emailText');
    expect(emailText.props.children).toBe('test@gmail.com');

    const commentText = getByTestId('commentBody');
    expect(commentText.props.children).toBe('Sample Comment');
  });
});
