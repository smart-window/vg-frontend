import styled from 'styled-components'

// !important is used here as PEGA overrides anything else with inline styles
export const DivPegaContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto !important;
  iframe#ReactMashupIfr, iframe[title='/reports'] {
    height: calc(100% - 4px) !important; /* prevent double scrollbar */
    width: 100% !important;
  }
`