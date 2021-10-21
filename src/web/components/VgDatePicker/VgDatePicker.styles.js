import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivDatePickerWrapper = styled.div`
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }
  input {
    cursor: pointer;
    padding-left: 6px;
    padding-right: 21px;
    width: 100%;
    box-sizing: border-box;
  }
  .react-datepicker {
    font-family: ${fonts.openSans};
    border: none;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  }
  .react-datepicker__header {
    background-color: ${colors.coolGray};
    border-bottom: none;
  }
  .react-datepicker__current-month, .react-datepicker__day-name {
    color: ${colors.charcoal};
  }
  .react-datepicker__day {
    &:hover {
      background-color: ${colors.coolGray};
    }
    &:focus {
      outline: none;
    }
  }
  .react-datepicker-popper {
    z-index: 13; // above lastpass icon
  }
  .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      border-bottom-color: ${colors.coolGray};
      &::before {
        border-bottom-color: ${colors.coolGray};
      }
  }
  .react-datepicker__close-icon {
    &::after {
      background-color: ${colors.gray30};
      height: 12px;
      width: 12px;
      font-family: ${fonts.openSans};
    }
  }
  .react-datepicker__day--keyboard-selected, .react-datepicker__day--selected {
    background-color: ${colors.officialBlue};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.officialBlue};
    }
  }
  .react-datepicker__navigation--next {
    border-left-color: ${colors.officialBlue};
  }
  .react-datepicker__navigation--previous {
    border-right-color: ${colors.officialBlue};
  }
  .react-datepicker__navigation--next, .react-datepicker__navigation--previous {
    &:hover {
      opacity: 0.4;
    }
    &:focus {
      outline: none;
    }
  }
`

export const ImgCalendar = styled.img`
  position: absolute;
    top: 30%;
    right: 6px;
  pointer-events: none;
`