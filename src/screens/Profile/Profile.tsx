import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {profileData, ReduxState} from 'type';
import {fontFamily} from 'constant/fonts';
import colors from 'constant/colors';
import Header from 'components/Header';
import {Controller, useForm} from 'react-hook-form';
import InputText from 'components/InputText';
import style from './style';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {object, string} from 'yup';
import ActionButton from 'components/ActionButton';
import {getScaleNumber} from 'utils/refDimention';
import CustomIcon from 'components/CustomIcon';
import {launchCamera} from 'react-native-image-picker';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import storage from '@react-native-firebase/storage';
import {requestCameraPermission} from 'utils/permissions';

const options = {
  mediaType: 'photo',
  quality: 1,
  cameraType: 'back',
  saveToPhotos: true, // Save to user's gallery (optional)
};

const Profile = () => {
  const {authData} = useSelector((state: ReduxState) => state.auth);
  const [userData, setUserData] = useState<profileData>();
  const [isEdit, setIsEdit] = useState(false);
  const {
    control,
    setError,
    onSubmit,
    goToBack,
    goToHomePage,
    setImageUri,
    setValue,
    setIsImageSave,
  } = useSignupMore();

  useEffect(() => {
    getProfileData();
  }, []);
  const getProfileData = async () => {
    const userProfile = await firestore()
      .collection('users')
      .doc(authData.userId)
      .get();

    if (userProfile.exists) {
      const data = userProfile.data();
      if (data) {
        setUserData(data);
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('email', data.email);
        setValue('phoneNumber', data.phone);
        setValue('address', data.address);
        setImageUri(data.profileImageUrl);
      }
      console.log('User profile data:', data);
      return data; // Return the user profile data for further use
    } else {
      console.log('User profile not found');
    }
  };

  const captureImage = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.error('Camera Error: ', response.error);
        } else {
          const source = {uri: response.assets[0].uri};
          console.log(source);
          setImageUri(response.assets[0].uri);
          setIsImageSave(true);
          setUserData({...userData, profileImageUrl: response.assets[0].uri});
        }
      });
    } else {
      console.log('Camera permission not granted');
      // Optionally request the permission
      const grantedRequest = await requestCameraPermission();
      Alert.alert('Error', 'Please add permission manually', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
      return grantedRequest;
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        title={!isEdit ? 'Profile' : 'Edit Profile'}
        uri={userData?.profileImageUrl}
        isImage={!isEdit}
        onPress={() => setIsEdit(!isEdit)}
      />
      <TouchableOpacity
        disabled={!isEdit}
        onPress={() => captureImage()}
        style={ style.imageContainer}>
        {userData?.profileImageUrl ? (
          <Image
            style={style.image}
            source={{uri: userData?.profileImageUrl}}
          />
        ) : (
          <View
            style={style.emptyView}>
            <CustomIcon
              icon={'face-man-profile'}
              type={'MaterialCommunityIcons'}
              color="white"
              size={30}
            />
          </View>
        )}
        {isEdit && (
          <View style={{position: 'absolute'}}>
            <CustomIcon
              icon={'camera'}
              type={'Feather'}
              color="white"
              size={30}
            />
          </View>
        )}
      </TouchableOpacity>
      <ScrollView style={style.scrollContainer}>
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
                editable={isEdit}
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
                editable={isEdit}
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
                editable={isEdit}
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
                editable={isEdit}
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
                editable={isEdit}
              />
            </>
          )}
        />

        <View style={style.buttonContainer}>
          <ActionButton
            title={isEdit ? 'Save' : 'Edit'}
            onPress={() => (isEdit ? onSubmit() : setIsEdit(true))}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const schema = object({
  firstName: string().default('').nullable().notRequired(),
  lastName: string().default('').nullable().notRequired(),
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
  const [isImageSave, setIsImageSave] = useState(false);
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
    setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async data => {
    try {
      if (isImageSave) {
        dispatch(startLoading());
        dispatch(setMessage('uploading..'));
        //   goToHomePage();
        const fileName = authData.userId + '_' + new Date().getTime() + '.jpg';
        const storageRef = storage().ref(
          `users/${authData.userId}/profile/${fileName}`,
        );

        const task = storageRef.putFile(imageUri);

        // Monitor upload progress
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });

        // Handle upload success or failure
        try {
          await task;
          await storageRef.getDownloadURL().then(downloadURL => {
            updateProfileData(data, downloadURL);
            // console.log('.........URL DOWN', downloadURL);
            dispatch(endLoading());
            // navigation.navigate('USER_MORE_INFO', {imageUri: downloadURL});
          });
          // return downloadURL;
        } catch (error) {
          dispatch(endLoading());
          console.error('Upload Error:', error);
          return null;
        }
      } else {
        updateProfileData(data, imageUri);
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  });

  const updateProfileData = async (data: any, url: string) => {
    dispatch(startLoading());
    dispatch(setMessage('Updating..'));
    await firestore()
      .collection('users')
      .doc(authData.userId)
      .update({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
        address: data.address,
        profileImageUrl: url,
        updatedAt: firestore.FieldValue.serverTimestamp(), // Optional: Track when the profile was updated
      })
      .then(res => {
        dispatch(endLoading());
      })
      .catch(error => {
        console.log('..........', error);
      });
  };

  return {
    control,
    setError,
    onSubmit,
    goToBack,
    goToHomePage,
    setImageUri,
    setValue,
    setIsImageSave,
  };
};
