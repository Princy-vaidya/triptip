import {StyleSheet} from 'react-native';
import {FONT, GAP, COLORS} from './constants';

export const globalStyle = StyleSheet.create({
  boldMedium: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: FONT.FAMILY.BOLD,
  },
  SemiboldMedium: {
    fontSize: 25,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
  },
  cardBox: {
    padding: GAP.MEDIUM,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    borderRadius: 15,
    //borderWidth: 1,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: GAP.SMALL,
    marginVertical: GAP.SMALL,
  },
});
