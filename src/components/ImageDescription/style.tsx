import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';

export default StyleSheet.create({
  container: {
    width: 250,
    height: 300,
    backgroundColor: colors.white,
    borderWidth:2,
    borderColor:colors.seperator
  },
  image: {width: '100%', height: 130},
  detailsContainer: {
    padding: 10,
  },
  title: {fontFamily: fontFamily.interBold, fontSize: 16},
  description: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: 16,
    color: colors.gray,
  },
});
