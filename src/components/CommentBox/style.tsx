import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    elevation: 1,
    padding: 5,
    marginTop: 5,
  },
  emailText: {
    fontFamily: fontFamily.notoSansRegular,
    color: colors.gray,
    fontSize: 12,
  },
  bodyText: {
    fontFamily: fontFamily.notoSansRegular,
    color: colors.black,
    marginTop: 10,
  },
});
