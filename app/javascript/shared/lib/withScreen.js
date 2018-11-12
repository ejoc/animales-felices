import React from 'react'

export const IsMobileContext = React.createContext(false)

export default function withScreen(Component) {
  return function ScreenComponent(props) {
    return (
      <IsMobileContext.Consumer>
        {isMobile => <Component {...props} isMobile={isMobile} />}
      </IsMobileContext.Consumer>
    )
  }
}