import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomColor: colors.seperator,
    borderBottomWidth: 2,
  },
  imageContainer: {flex: 1},
  image: {width: 50, height: 50, borderRadius: 100},
  title: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: 17,
    color: colors.headerBlack,
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  description: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: 16,
    color: colors.gray,
  },
});
