import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';

export default StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.seperator,
  },
  image: {width: 45, height: 45, borderRadius: 100},
  imageContainer: {flex: 0.2},
  title: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: 16,
    color: colors.headerBlack,
  },
  detailsContainer: {
    flex: 0.65,
  },
  iconContainer: {
    flex: 0.1,
  },
  description: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: 14,
    color: colors.gray,
  },
});
