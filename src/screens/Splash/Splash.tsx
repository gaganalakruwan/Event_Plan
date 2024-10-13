import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated, LogBox} from 'react-native';
import splashStyles from './style';
import {useDispatch, useSelector} from 'react-redux';

import {ReduxState} from '../../type';
import firestore from '@react-native-firebase/firestore';

const Splash = () => {
  const navigation = useNavigation();
  const moveOpacityVal = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {authData} = useSelector((state: ReduxState) => state.auth);

  useEffect(() => {
    moveOpacity();
  }, []);

  const moveOpacity = () => {
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    Animated.timing(moveOpacityVal, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      movetoHome();
    });
  };

  const movetoHome = async () => {
    if (authData?.userId) {
      getProfileData();
      // navigation.navigate(NAVIGATION_STACK.HOME as never);
    } else {
      navigation.navigate('LOGIN' as never);
    }
  };

  const getProfileData = async () => {
    const userProfile = await firestore()
      .collection('users')
      .doc(authData.userId)
      .get();

    if (userProfile.exists) {
      const data = userProfile.data();
      if (data) {
        navigation.navigate('DRAWER_NAVIGATION' as never);
      }
    } else {
      navigation.navigate('LOGIN' as never);
      console.log('User profile not found');
    }
  };

  return (
    <Animated.View style={[splashStyles.container, {opacity: moveOpacityVal}]}>
      <View style={splashStyles.logoView}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={splashStyles.image}
        />
        {/* <Text style={splashStyles.hrmsTxt}>Eco Technologies</Text> */}
      </View>
    </Animated.View>
  );
};

export default Splash;
