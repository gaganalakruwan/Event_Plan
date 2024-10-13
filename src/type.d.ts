import {string} from 'yup';

export declare type commonState = {
  loading: boolean;
  spinnerMessage: string;
};

export declare type authDataType = {
  email: string;
  userId: string;
};

export declare type authState = {
  authData: authDataType;
};

export declare interface ReduxState {
  auth: authState;
  common: commonState;
}

export declare type ImageDesc = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export declare type profileData = {
  address: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImageUrl: string;
};

export declare type postData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export declare type comments = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export declare enum IconType {
  FontAwesome = 'FontAwesome',
  AntDesign = 'AntDesign',
  MaterialIcons = 'MaterialIcons',
  EvilIcons = 'EvilIcons',
  Entypo = 'Entypo',
  Foundation = 'Foundation',
  Ionicons = 'Ionicons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Zocial = 'Zocial',
  Octicons = 'Octicons',
  SimpleLineIcons = 'SimpleLineIcons',
  Fontisto = 'Fontisto',
  Feather = 'Feather',
  FontAwesome5 = 'FontAwesome5',
}
export interface IconProps extends TextProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  brand?: string;
  solid?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: TextStyle;
}
