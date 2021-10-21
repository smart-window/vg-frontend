import {colors} from 'shared/constants/cssConstants'

import WorkTimeIcon from 'mobile/icons/StaticIcons/WorkTimeType'
import BreakTimeIcon from 'mobile/icons/DynamicIcons/BreakTimeType'
import PlannedAbsenceIcon from 'mobile/icons/DynamicIcons/Calendar'

export const timeTypesDisplayData = {
  'break time': {
    colorRepresentation: colors.officialBlue,
    icon: BreakTimeIcon
  },
  'work time': {
    colorRepresentation: colors.green,
    icon: WorkTimeIcon,
  },
  'planned absence': {
    colorRepresentation: colors.yellow,
    icon: PlannedAbsenceIcon
  }
}