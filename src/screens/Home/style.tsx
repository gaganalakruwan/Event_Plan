import colors from 'constant/colors';
import {fontFamily} from 'constant/fonts';
import {StyleSheet} from 'react-native';
import {getScaleNumber} from 'utils/refDimention';

export default StyleSheet.create({
    container:{flex: 1, backgroundColor: 'white'},
 scrollContainer:{marginBottom: 30},
 innerContainer:{marginHorizontal: 20},
 eventText:{
    fontFamily: fontFamily.interSemiBold,
    fontSize: 22,
    color: colors.headerBlack,
  },
  addressText:{
    fontFamily: fontFamily.notoSansRegular,
    fontSize: 14,
    color: colors.gray,
  },
  organizeText:{
    fontFamily: fontFamily.interSemiBold,
    fontSize: 22,
    color: colors.headerBlack,
    marginVertical: 20,
  },
  imageHeaderContainer:{
    flexDirection: 'row',
    height: 30,
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  image:{
    fontFamily: fontFamily.interSemiBold,
    fontSize: 22,
    color: colors.headerBlack,
  },
  iconView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  allPhotoText:{
    fontFamily: fontFamily.interSemiBold,
    fontSize: 14,
    color: colors.buttonRed,
  },
  postContainer:{
    height: 70,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.seperator,
    borderBottomColor: colors.seperator,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postCount:{
    fontFamily: fontFamily.interSemiBold,
    fontSize: 16,
    color: colors.buttonRed,
  },
  postText:{
    fontFamily: fontFamily.notoSansMedium,
    fontSize: 13,
    color: colors.gray,
  },
  
});
