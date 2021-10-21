import React, { useContext, useState } from 'react'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import { AsideAnimatedContainer } from 'web/components/AnimatedDropdown/AnimatedDropdown.styles'
import DropdownArrowIcon from 'web/components/DynamicIcons/DropdownArrowIcon'
import LightBulbSmallIcon from 'web/components/DynamicIcons/LightBulbSmallIcon'
import { HelpjuiceFlyoutContext } from 'web/providers/HelpjuiceFlyoutProvider'

/**
 * a component that renders the dropdown for the actions that can be taken on a process
 * @category Components - Web
 * @module UserAvatar
 */
function ProcessActionsDropdown(props) {
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const { setIsExpanded } = useContext(HelpjuiceFlyoutContext)

  /**
   * This function opens the helpjuice flyout and closes the dropdown
   */
  function handleKnowledgeClick() {
    setIsExpanded(true)
    setIsActionsOpen(false)
  }

  return (
    <DivActionsButtonContainer>
      <ButtonActions
        isActive={isActionsOpen}
        onClick={() => setIsActionsOpen((state) => !state)}
      >
        Actions <DropdownArrowIcon />
      </ButtonActions>
      {isActionsOpen && (
        <AnimatedDropdown
          isDropdownOpen
          onClickOutside={() => setIsActionsOpen(false)}
        >
          <DivActionsDropdownContainer>
            <DivKnowledgeArticles onClick={handleKnowledgeClick}>
              <LightBulbSmallIcon /> Get Knowledge on this Onboarding
            </DivKnowledgeArticles>
            <div>Cancel Onboarding & Mark as Lost</div>
          </DivActionsDropdownContainer>
        </AnimatedDropdown>
      )}
    </DivActionsButtonContainer>
  )
}

const DivKnowledgeArticles = styled.div`
  color: ${colors.fuchsia};
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 2px;
    height: 18px;
    width: 18px;
  }
`

const DivActionsButtonContainer = styled.div`
  position: relative;

  & > ${AsideAnimatedContainer} {
    top: initial;
    right: 0;
  }
`

const DivActionsDropdownContainer = styled.div`
  margin-top: 2px;
  border-radius: 12px;
  padding: 12px 0;
  background: ${colors.white};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  & > div {
    padding: 4px 16px;
    text-align: right;
    white-space: nowrap;
    &:hover {
      background: ${colors.boneWhite};
    }
  }
`

const ButtonActions = styled.button`
  padding: 4px 16px;
  background: ${(p) => (p.isActive ? colors.officialBlue : colors.white)};
  color: ${(p) => (p.isActive ? colors.white : colors.officialBlue)};
  font-size: 1rem;
  font-family: ${fonts.openSans};
  border-radius: 6px;
  border: 1px solid ${colors.officialBlue};
  &:focus {
    outline: none;
  }
  & > svg {
    height: 10px;
    width: 8px;
  }
`

export default ProcessActionsDropdown
