import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer:{paddingHorizontal: 20},
  welcomeText: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: getScaleNumber(32),
    color: colors.headerBlack,
  },
  signInText: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: getScaleNumber(14),
    marginTop: 10,
    color: colors.gray,
  },

  inputUsername: {
    marginTop: 60,
  },
  inputPassword: {
    marginTop: 20,
  },

  restoreText: {
    color: colors.buttonRed,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  welcomeView: {
    flexDirection: 'column',
    marginTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
  },
  restoreContainer:{alignItems: 'flex-end', marginTop: 20},
  restoreInner:{flexDirection: 'row', alignItems: 'center'},
  bittonContainer:{marginTop: getScaleNumber(150)}
});
