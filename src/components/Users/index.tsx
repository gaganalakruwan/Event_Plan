import {View, Text, Image} from 'react-native';
import React from 'react';
import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import CustomIcon from 'components/CustomIcon';
import style from './style';

type Props = {
  uri?: string;
  title?: string;
  description?: string;
};

const Users = ({uri, title, description}: Props) => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image style={style.image} source={{uri: uri}} />
      </View>
      <View style={style.detailsContainer}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      <View style={style.iconContainer}>
        <CustomIcon
          type={'MaterialCommunityIcons'}
          icon={'message-processing-outline'}
          color={colors.headerBlack}
          size={30}
        />
      </View>
    </View>
  );
};

export default Users;
