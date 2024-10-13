import {PermissionsAndroid} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

const checkCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PERMISSIONS.ANDROID.CAMERA,
    );
    if (granted) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
}  
export {checkCameraPermission,requestCameraPermission};
