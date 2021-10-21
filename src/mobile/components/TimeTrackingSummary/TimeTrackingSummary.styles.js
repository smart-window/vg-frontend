import {colors, mobileFonts} from 'shared/constants/cssConstants'
import styled from 'styled-components/native'

export const ViewDateInspector = styled.View`
  width: 100%;
  flex-grow: 1;
  margin-bottom: ${props => props.isWeeklyView ? 0 : 50}px;
`

export const ViewInstructionsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 42px 60px 60px 60px;
  width: 100%;
`

export const ViewInstructionsTextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

export const TextFlexRow = styled.Text`
  display: flex;
  flex-direction: row;
`

export const TextBoldDateSelectInstructions = styled.Text`
  font-family: ${mobileFonts.openSans(700, true)};
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${colors.gray50};
`

export const TextDateSelectInstructions = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 15px;
  font-style: italic;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${colors.gray50};
`

export const ViewTimeEntries = styled.View`
  margin: 30px 0;
  width: 100%;
`

export const TextTimeEntry = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 15px;
  line-height: 20px;
  text-align: left;
  color: ${colors.charcoal};
  margin-top: 12px;
  margin-left: 30px;
`

export const TouchableOpacityAddEntry = styled.TouchableOpacity`

`

export const ViewNoEntriesInstructions = styled.View`
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  height: 56px;
  width: 100%;
  margin-top: 6px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${colors.gray50};
  border-style: dashed;
`

export const TextNoEntriesYet = styled.Text`
  margin-right: 12px;
  font-family: ${mobileFonts.openSans(400, true)};
  font-size: 18px;
  font-style: italic;
  line-height: 25px;
  color: ${colors.gray50};
  max-width: 92%;
`

export const ViewTimeEntry = styled.View`
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  height: 56px;
  width: 100%;
  padding: 0 12px;
  background-color: ${colors.boneWhite};
`

export const TextEntry = styled.Text`
  font-family: ${mobileFonts.openSans(400)};
  font-size: 18px;
  line-height: 25px;
  margin-left: 18px;
`

export const TouchableOpacityQuickAction = styled.TouchableOpacity`
  width: 48px;
  height: 100%;
  border-left-width: 1px;
  border-color: ${colors.charcoal};
  align-items: center;
  justify-content: center;
  background-color: ${'#fcfeff'};
`

export const ViewRowContainer = styled.View`
  margin-top: 6px;
`