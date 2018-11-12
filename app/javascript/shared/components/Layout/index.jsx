/* eslint global-require: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { LocaleProvider, message } from 'antd'
import esES from 'antd/lib/locale-provider/es_ES'
// import { IsMobileContext } from '../../hocs/withScreen'
import Header from './Header'
import Footer from './Footer'

import '../../styles/style.less'

// let isMobile = false
// enquireScreen((b) => {
//   isMobile = b
// })

class LayoutAnt extends React.Component {
  componentDidMount() {
    // enquireScreen((b) => {
    //   this.setState({
    //     isMobile: !!b,
    //   })
    // })
    // .register('only screen and (min-width: 0) and (max-width: 992px)', {
    const { flashMessages } = this.props
    if (flashMessages && flashMessages.length) {
      flashMessages.forEach(m => {
        let messageType = null
        switch (m.type) {
          case 'notice':
            messageType = 'info'
            break
          case 'alert':
            messageType = 'warning'
            break
          default:
            messageType = m.type
            break
        }
        message[messageType](m.text, 3)
      })
    }
  }

  render() {
    const { children, ...restProps } = this.props
    return (
      <LocaleProvider locale={esES}>
        <div className="page-wrapper">
          <Header {...restProps} />
          {children}
          <Footer />
        </div>
      </LocaleProvider>
    )
  }
}

LayoutAnt.propTypes = {
  children: PropTypes.element.isRequired,
  flashMessages: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
}

LayoutAnt.defaultProps = {
  flashMessages: [],
}

export default LayoutAnt
