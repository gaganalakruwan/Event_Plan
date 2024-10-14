import {View, Text} from 'react-native';
import React from 'react';
import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import style from './style';

type Props = {
  email: string;
  body: string;
};
const CommentBox = ({email, body}: Props) => {
  return (
    <View style={style.container}>
      <Text testID='emailText' style={style.emailText}>{email}</Text>
      <Text testID='commentBody' style={style.bodyText}>{body}</Text>
    </View>
  );
};

export default CommentBox;
