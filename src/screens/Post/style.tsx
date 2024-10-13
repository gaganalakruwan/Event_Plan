import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  container: {
    height: 300,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  closeContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentText: {
    color: colors.black,
    fontFamily: fontFamily.interBold,
    fontSize: 16,
  },
  listContainer:{marginHorizontal: 20},
  modal:{
    justifyContent: 'flex-end',
    margin: 0,
  }
});
