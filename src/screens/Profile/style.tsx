import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputUsername: {
    marginTop: 60,
  },
  inputPassword: {
    marginTop: 20,
  },
  emptyView: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: colors.darkWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 120, height: 120, borderRadius: 100},
  scrollContainer:{marginHorizontal: 20, marginBottom: 30},
  buttonContainer:{marginTop: getScaleNumber(20)}
});
