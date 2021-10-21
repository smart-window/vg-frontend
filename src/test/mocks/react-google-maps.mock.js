jest.mock('@react-google-maps/api', () => {
  const React = require('react')
  return {
    withGoogleMap: (Component) => Component,
    withScriptjs: (Component) => Component,
    Polyline: (props) => <div />,
    Marker: (props) => <div />,
    GoogleMap: (props) => (<div><div className='mock-google-maps' />{props.children}</div>),
    StandaloneSearchBox: (({children}) => <div>{children}</div>)
  }
})