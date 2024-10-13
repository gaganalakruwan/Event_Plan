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
    margin: 2,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.darkWhite,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 20,
  },
  versionView: {
    position: 'absolute',
    width: '100%',
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 14,
  },
});
