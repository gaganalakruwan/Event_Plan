import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';
import CustomIcon from 'components/CustomIcon';

type Props = {
  header: string;
  description: string;
  onPress: () => void;
};

const PostData = ({header, description, onPress}: Props) => {
  return (
    <View style={style.container}>
      <View style={style.textWrapper}>
        <Text style={style.headerText}>{header}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      <View style={style.iconWrapper}>
        <TouchableOpacity>
          <CustomIcon
            icon={'thumbs-o-up'}
            type={'FontAwesome'}
            color="blue"
            size={30}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomIcon
            icon={'thumbs-o-down'}
            type={'FontAwesome'}
            color="blue"
            size={30}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>

        <View style={{flex: 1}} />
        <TouchableOpacity onPress={onPress}>
          <CustomIcon
            icon={'message-processing-outline'}
            type={'MaterialCommunityIcons'}
            color="black"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostData;
