import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  welcomeText: {
    fontFamily: fontFamily.interSemiBold,
    fontSize: getScaleNumber(19),
    color: colors.headerBlack,
  },
  signInText: {
    fontFamily: fontFamily.notoSansRegular,
    fontSize: getScaleNumber(14),
    marginTop: 5,
    color: colors.gray,
  },

  inputUsername: {
    marginTop: 20,
  },
  inputPassword: {
    marginTop: 20,
  },

  welcomeView: {
    flexDirection: 'column',
    marginTop: 30,
  },

  buttonContainer:{
    marginBottom: getScaleNumber(50),
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  innerContainer:{paddingHorizontal: 20, flex: 1},
  button:{backgroundColor: 'white', flex: 1}
});
