import styled, {css} from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'
import {Dimensions} from 'react-native'

export const ViewCalendarHeader = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const TextCalendarHeader = styled.Text`
  font-family: ${mobileFonts.deviceSpecificFont};
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: ${colors.charcoal};
`

export const TextCalendarDescriptor = styled.Text`
  font-family: ${mobileFonts.openSans(400, true)};
  font-style: italic;
  font-size: 12px;
  line-height: 16px;
  color: ${colors.gray50};
`

export const ViewArrowContainer = styled.View`
  ${props => props.isLeft && css`
    transform: rotate(180deg);
  `}
`

export const ViewCalendarContainer = styled.View`
  position: relative;
  overflow: hidden;
  margin-top: -20px;
`

export const ViewBackgroundGrey = styled.View`
  position: absolute;
  top: 118px;
  height: 100%;
  width: 38px;
  background-color: ${colors.boneWhite};
  z-index: -1;
  ${props => props.isRightAligned && css`
    right: 6px;
  `}
  ${props => !props.isRightAligned && css`
    left: 6px;
  `}
`

export const calendarStyle = {
  width: Dimensions.get('window').width - 84,
  marginTop: 30
}

export const calendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  textSectionTitleColor: colors.gray50,
  selectedDayTextColor: colors.white,
  todayTextColor: colors.officialBlue,
  dayTextColor: colors.charcoal,
  textDisabledColor: colors.gray30,
  dotColor: colors.officialBlue,
  selectedDotColor: colors.white,
  arrowColor: colors.deepNavy,
  monthTextColor: colors.officialBlue,
  indicatorColor: colors.officialBlue,
  textDayFontFamily: mobileFonts.deviceSpecificFont,
  textMonthFontFamily: mobileFonts.deviceSpecificFont,
  textDayHeaderFontFamily: mobileFonts.deviceSpecificFont,
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 15,
  textMonthFontSize: 15,
  textDayHeaderFontSize: 15,
  'stylesheet.day.period': {
    todayText: {
      fontWeight: 'bold',
      color: colors.officialBlue,
    },
    base: {
      overflow: 'hidden',
      height: 34,
      alignItems: 'center',
      width: 38,
    }
  },
  'stylesheet.calendar.header': {
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    }
  }
}
