import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from 'components/CustomIcon';
import colors from 'constant/colors';
import ActionButton from 'components/ActionButton';
import {getScaleNumber} from 'utils/refDimention';
import {launchCamera} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from 'type';
import storage from '@react-native-firebase/storage';
import {
  endLoading,
  setMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {
  checkCameraPermission,
  requestCameraPermission,
} from 'utils/permissions';

const options = {
  mediaType: 'photo',
  quality: 1,
  cameraType: 'back',
  saveToPhotos: true, // Save to user's gallery (optional)
};

const ImageUpload = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState('');
  const {authData} = useSelector((state: ReduxState) => state.auth);

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
        }
      });
    } else {
      console.log('Camera permission not granted');
      // Optionally request the permission
      const grantedRequest = await requestCameraPermission();
      
      return grantedRequest;
    }
  };

  const uploadImage = async () => {
    try {
      if (imageUri) {
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
            console.log('.........URL DOWN', downloadURL);
            dispatch(endLoading());
            navigation.navigate('USER_MORE_INFO', {imageUri: downloadURL});
          });
          // return downloadURL;
        } catch (error) {
          dispatch(endLoading());
          console.error('Upload Error:', error);
          return null;
        }
      } else {
        navigation.navigate('USER_MORE_INFO', {imageUri: ''});
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <KeyboardAvoidingView>
          <View style={style.welcomeView}>
            <Text style={style.welcomeText}>Welcome</Text>
            <Text style={style.signInText}>
              You are logged in for the first time and can upload a profile
              photo
            </Text>
          </View>

          {imageUri ? (
            <TouchableOpacity onPress={() => captureImage()}>
              <Image source={{uri: imageUri}} style={style.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => captureImage()}
              style={style.emptyContainer}>
              <CustomIcon
                icon={'camera'}
                type={'Feather'}
                color={colors.buttonRed}
                size={30}
              />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
      <View style={style.nextContainer}>
        <ActionButton
          title={'Next'}
          onPress={() => uploadImage()}
          isRightIcon={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default ImageUpload;
