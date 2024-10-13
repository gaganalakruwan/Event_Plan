import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  innerContainer:{
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
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
    textAlign:'center',
    marginHorizontal:getScaleNumber(30)
  },

  welcomeView: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  image:{
    width: getScaleNumber(120),
    height: getScaleNumber(120),
    backgroundColor: colors.ImageBackground,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer:{
    width: getScaleNumber(120),
    height: getScaleNumber(120),
    backgroundColor: colors.ImageBackground,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextContainer:{marginBottom: getScaleNumber(50), marginHorizontal: 20}
});
