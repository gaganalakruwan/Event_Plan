import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';

export default StyleSheet.create({
  container: {
    elevation: 1,
    padding: 10,
    height: 250,
    marginTop: 10,
    backgroundColor: colors.white,
    margin:2
  },
  textWrapper: {
    flex: 1,
  },
  headerText: {
    fontFamily: fontFamily.interBold,
    fontSize: 16,
    color: colors.headerBlack,
  },
  description: {
    fontFamily: fontFamily.notoSansRegular,
    color: colors.gray,
    marginTop: 10,
  },
  iconWrapper: {flexDirection: 'row'},
});
