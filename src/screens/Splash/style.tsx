import {StyleSheet} from 'react-native';
import colors from '../../constant/colors';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },

  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',

  },

  hrmsTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.yellow,
    fontStyle: 'italic',
  },

  poweredBy: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  poweredByView: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
    flexDirection: 'row',
  },

  logo: {
    width: 30,
    height: 40,
    marginLeft: 2,
    resizeMode: 'contain',
  },
});

export default splashStyles;
