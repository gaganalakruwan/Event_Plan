import React, {useMemo, useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  ViewStyle,
  KeyboardType,
  TouchableOpacity,
  Text,
} from 'react-native';

import style from './style';
import CustomIcon from '../CustomIcon';
import colors from '../../constant/colors';
// import { IconType } from 'type';

type RightIconProps = {
  iconName?: string;
  iconProvider?: any;
  iconColor?: string;
  iconSize?: number;
  action?: () => void;
};
type LeftIconProps = {
  lIconName?: string;
  lIconProvider?: any;
  lIconColor?: string;
  lIconSize?: number;
};

type InputProps = {
  placeHolder: string;
  value: string;
  onChange?: (val: string) => void;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  autoFocus?: boolean | false;
  rightIcon?: RightIconProps;
  leftIcon?: LeftIconProps;
  inputStyle?: any;
  onFocus?: void;
  error?: string;
  editable?: boolean;
  testId?: string;
};

const InputText = ({
  containerStyle,
  keyboardType,
  onChange,
  placeHolder,
  secureTextEntry,
  value,
  autoFocus = false,
  rightIcon,
  leftIcon,
  inputStyle,
  onFocus,
  error,
  editable,
  testId,
}: InputProps) => {
  const {
    iconName,
    iconProvider,
    iconColor,
    iconSize,
    action = () => {},
  } = (rightIcon as RightIconProps) || {};
  const {lIconName, lIconProvider, lIconColor, lIconSize} =
    (leftIcon as LeftIconProps) || {};
  const [passwordVisibility, setPasswordVisibility] = useState(secureTextEntry);

  const toggleVisibility = () => {
    setPasswordVisibility(current => !current);
  };

  const rightIconName = useMemo(() => {
    if (iconName) {
      return iconName;
    }
    if (!passwordVisibility) {
      return 'eye';
    } else {
      return 'eye-slash';
    }
  }, [iconName, passwordVisibility]);

  return (
    <View style={[style.container, {...containerStyle}]}>
      <Text style={style.title}>{placeHolder}</Text>
      <View style={style.inputWrapper}>
        <TextInput
          testID={testId}
          secureTextEntry={passwordVisibility}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChange}
          selectionColor="black"
          placeholder={placeHolder}
          editable={editable}
          onFocus={onFocus}
          style={[
            style.input,
            inputStyle,
            (secureTextEntry || rightIcon || leftIcon) && style.secureInput,
          ]}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
          autoFocus={autoFocus}
          placeholderTextColor={colors.darkGray}
        />
        {(iconName || secureTextEntry) && (
          <TouchableOpacity
            style={style.iconWrapper}
            onPress={secureTextEntry ? toggleVisibility : action}>
            <CustomIcon
              icon={rightIconName}
              type={iconProvider || 'FontAwesome'}
              size={iconSize || 24}
              color={iconColor || colors.black}
            />
          </TouchableOpacity>
        )}
        {lIconName && (
          <TouchableOpacity
            style={style.leftIconWrapper}
            onPress={secureTextEntry ? toggleVisibility : action}>
            <CustomIcon
              icon={lIconName}
              type={lIconProvider}
              size={lIconSize || 24}
              color={lIconColor || colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={style.errorText}>{error}</Text>
    </View>
  );
};

export default InputText;
