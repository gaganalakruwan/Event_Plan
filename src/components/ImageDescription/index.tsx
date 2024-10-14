import {View, Text, Image} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  imageUri: string;
  title: string;
  description: string;
};

const ImageDescription = ({imageUri, title, description}: Props) => {
  return (
    <View style={style.container}>
      <Image testID='imageComponent' style={style.image} source={{uri: imageUri}} />
      <View style={style.detailsContainer}>
        <Text testID='titleText' style={style.title}>{title}</Text>
        <Text testID='descriptionText' numberOfLines={4} style={style.description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ImageDescription;
