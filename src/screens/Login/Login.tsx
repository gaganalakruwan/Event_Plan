import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import {TouchableOpacity} from 'react-native-gesture-handler';

import style from './style';
import {useNavigation} from '@react-navigation/native';

import CustomIcon from 'components/CustomIcon';
import colors from 'constant/colors';
import ActionButton from 'components/ActionButton';
import {object, string} from 'yup';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {auth} from 'utils/firebase';
import {setUserData} from '../../redux/action/AuthActions';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const {goToSignUp, control, setError, onSubmit, goToImageUpload} = useLogin();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(endLoading());
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const user = auth().currentUser;

    console.log('........', user);
    if (user?.uid) {
      // navigation.navigate('DRAWER_NAVIGATION' as never);
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <KeyboardAvoidingView>
          <View style={style.welcomeView}>
            <Text style={style.welcomeText}>Welcome</Text>
            <Text style={style.signInText}>Welcome to your Portal</Text>
          </View>
          <Controller
            control={control}
            name="username"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="Email"
                  leftIcon={{
                    lIconName: 'mail',
                    lIconProvider: 'AntDesign',
                    lIconSize: 20,
                  }}
                  containerStyle={style.inputUsername}
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  secureTextEntry
                  placeHolder="Password"
                  leftIcon={{
                    lIconName: 'lock',
                    lIconProvider: 'EvilIcons',
                    lIconSize: 30,
                  }}
                  containerStyle={style.inputPassword}
                  error={error?.message}
                />
              </>
            )}
          />
          <View style={style.restoreContainer}>
            <TouchableOpacity
              style={style.restoreInner}>
              <Text style={style.restoreText}>Restore Password</Text>
              <CustomIcon
                type={'Feather'}
                icon={'arrow-up-right'}
                color={colors.buttonRed}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={style.bittonContainer}>
            <ActionButton
              title={'Login'}
              onPress={onSubmit}
              isRightIcon={true}
            />
            <ActionButton
              title={'Sign Up'}
              onPress={goToSignUp}
              isRightIcon={true}
              customStyle={{marginTop: 20}}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const schema = object({
  username: string()
    .required('Please enter Email')
    .default('')
    .email('Please Enter Valied Email Address'),
  password: string().required('Please enter password'),
});

export const useLogin = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const goToSignUp = useCallback(
    () => navigation.navigate('SIGNUP'),
    [navigation],
  );
  const goToImageUpload = async (userId: string) => {
    const userProfile = await firestore().collection('users').doc(userId).get();

    if (userProfile.exists) {
      navigation.navigate('DRAWER_NAVIGATION'); // Return the user profile data for further use
    } else {
      navigation.navigate('IMAGE_UPLOAD');
      console.log('User profile not found');
    }
  };

  const {
    control,
    setError,
    formState: {errors},
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async data => {
    try {
      dispatch(startLoading());
      dispatch(setMessage('Login..'));
      const userCredential = await auth()
        .signInWithEmailAndPassword(data.username, data.password)
        .then(res => {
          console.log(res.user);
          dispatch(endLoading());
          dispatch(
            setUserData({email: res?.user?.email, userId: res?.user?.uid}),
          );
          goToImageUpload(res?.user?.uid);
        })
        .catch(error => {
          console.log(error);
          dispatch(endLoading());
          Alert.alert('Error', 'Invalied Credentials', [{text: 'Ok'}]);
        });
    } catch (error) {
      console.error('Signup Error:', error);
    }
  });

  return {control, setError, onSubmit, goToSignUp, goToImageUpload};
};
