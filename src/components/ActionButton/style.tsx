import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';
import {fontFamily} from '../../constant/fonts';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.buttonRed,
    borderRadius: 2,
    height: getScaleNumber(44),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: fontFamily.notoSansMedium,
    color: colors.white,
    lineHeight: 20,
    marginHorizontal: 5,
  },
});
