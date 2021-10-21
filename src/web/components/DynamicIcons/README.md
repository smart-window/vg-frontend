This component folder contains 'react-ified' stateless svg components. The purpose of this is to dynamically style/color these icons without requiring multiple assets. Documentation is not required for these components.

If an icon is static, it belongs in `src/assets` instead of here.

For prop names, use `lineColor` for line color and `fillColor` for fill colors.

For react svg components, please do not overwrite props such as `fillColor` or `lineColor` with css. Other styling can be applied via the parent component stylesheet, following this example:

```javascript
import styled from 'styled-components'

export const DivParentComponent = styled.div`
  svg {
    height: 40px;
    width: 40px;
  }
`
```