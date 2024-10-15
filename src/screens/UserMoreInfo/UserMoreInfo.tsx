import {KeyboardAvoidingView, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputText from '../../components/InputText';
import style from './style';
import {useNavigation, useRoute} from '@react-navigation/native';

import colors from 'constant/colors';
import ActionButton from 'components/ActionButton';
import {getScaleNumber} from 'utils/refDimention';
import {object, string} from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {ReduxState} from 'type';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const UserMoreInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {control, setError, onSubmit, goToBack, goToHomePage, setImageUri} =
    useSignupMore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
    console.log('.......Image URL.....', route.params);
    setImageUri(route.params?.imageUri);
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <KeyboardAvoidingView>
          <View style={style.welcomeView}>
            <Text style={style.welcomeText}>Welcome</Text>
            <Text style={style.signInText}>
              You can add your personal data now or do it later
            </Text>
          </View>
          <Controller
            control={control}
            name="firstName"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="First Name"
                  containerStyle={style.inputUsername}
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="Last Name"
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="Email"
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="Phone Number"
                  error={error?.message}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <InputText
                  value={value}
                  onChange={onChange}
                  placeHolder="Address"
                  error={error?.message}
                />
              </>
            )}
          />
        </KeyboardAvoidingView>
      </View>
      <View
        style={style.buttonContainer}>
        <ActionButton
          title={'Back'}
          onPress={goToBack}
          isLeftIcon={true}
          customStyle={style.button}
          titleStyle={{color: colors.iconBlack}}
        />
        <ActionButton
          title={'Sign Up'}
          onPress={onSubmit}
          isRightIcon={true}
          customStyle={{flex: 1}}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserMoreInfo;

const schema = object({
  firstName: string().default('').required("Please enter first name"),
  lastName: string().default('').required("Please enter last name"),
  email: string()
    .default('')
    .nullable() // Allow the field to be empty (null)
    .notRequired() // Email is not required
    .email('Please enter a valid email address'),
  phoneNumber: string().default('').nullable().notRequired(),
  address: string().default('').nullable().notRequired(),
});

export const useSignupMore = () => {
  const {authData} = useSelector((state: ReduxState) => state.auth);
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const goToBack = useCallback(() => navigation.goBack(), [navigation]);
  const goToHomePage = useCallback(
    () => navigation.navigate('DRAWER_NAVIGATION'),
    [navigation],
  );

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
    saveUserData(data, authData.email, imageUri);
  });

  /**
   * add user mo information to firestore
   * @param data 
   * @param email 
   * @param imageUrl 
   */
  const saveUserData = async (data: any, email: string, imageUrl: string) => {
    try {
      await firestore()
        .collection('users')
        .doc(authData.userId)
        .set({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phoneNumber,
          address: data.address,
          profileImageUrl: imageUrl, // The URL of the uploaded image
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .then(res => {
          goToHomePage();
          console.log('...........complete', res);
        })
        .catch(error => {
          console.log('.............error', error);
        });
      //   console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return {control, setError, onSubmit, goToBack, goToHomePage, setImageUri};
};
