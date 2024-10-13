import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {fontFamily} from 'constant/fonts';
import colors from 'constant/colors';
import style from './style';
import CustomIcon from 'components/CustomIcon';

type Props = {
  uri?: string;
  title: string;
  isImage: boolean;
  isMenu?: boolean;
  onPress?: () => void;
};

const Header = ({uri, title, isImage, isMenu, onPress}: Props) => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        {isImage ? (
          <Image style={style.image} source={{uri: uri}} />
        ) : (
          <TouchableOpacity onPress={onPress}>
            {isMenu ? (
              <CustomIcon icon={'menu'} type={'Entypo'} size={30} />
            ) : (
              <CustomIcon icon={'arrowleft'} type={'AntDesign'} size={30} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Text style={style.title}>{title}</Text>
      <View style={style.imageContainer} />
    </View>
  );
};

export default Header;
