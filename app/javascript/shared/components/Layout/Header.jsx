import React from 'react'
import PropTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { Col, Row, Icon, Menu, Button, Popover } from 'antd'

import AccountNavigation from './AccountNavigation'

// import Navigation from './Navigation'
// import withScreen from '../../hocs/withScreen'
// import FooImage from '../../images/logo-256.png'

const { SubMenu } = Menu

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuVisible: false,
    }
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    })
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    })
  }

  handleMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    })
  }

  render() {
    const { menuVisible } = this.state
    const {
      // currentUser,
      userSignedIn,
      activeNav,
      // navigation: Navigation,
    } = this.props

    const menuMode = isMobile ? 'inline' : 'horizontal'

    const rigthMenu = userSignedIn
      ? [
          isMobile ? null : (
            <span key="avatar" className="header-avatar">
              <AccountNavigation />
            </span>
          ),
        ]
      : [
          <a key="signin" href="/users/sign_in">
            <Button className="ant-btn-login header-login-button header-avatar">
              INICIAR SESIÓN
            </Button>
          </a>,
        ].filter(Boolean)

    const menu = [
      ...rigthMenu,
      <Menu
        key="nav"
        mode={menuMode}
        id="nav"
        defaultSelectedKeys={[activeNav]}
        // style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="agenda">
          <a href="/agenda">
            <span>AGENDA</span>
          </a>
        </Menu.Item>
        <SubMenu key="transacciones" title={<span>TRANSACCIONES</span>}>
          <Menu.Item key="ingreso-productos">
            <a href="/ingreso-productos/new">INGRESO DE PRODUCTOS</a>
          </Menu.Item>
          <Menu.Item key="registro-venta">
            <a href="/facturacion">REGISTRO DE VENTA</a>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="reportes">
          <a href="/reportes">
            <span>REPORTES</span>
          </a>
          {/* <span>
            CAMBIAR CONTRASEÑA
          </span> */}
        </Menu.Item>
        {isMobile && userSignedIn && (
          <Menu.Item key="logout">
            <a href="/users/sign_out" data-method="delete" rel="nofollow">
              <Icon type="logout" />
              &nbsp; CERRAR SESSION
            </a>
          </Menu.Item>
        )}
      </Menu>,
    ]

    return (
      <header id="header">
        {isMobile && (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.handleMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        )}
        <Row>
          <Col xxl={5} xl={5} lg={4} md={6} sm={24} xs={24}>
            <a id="logo" href="/">
              {/* <img src={FooImage} alt="logo" /> */}
              image
            </a>
          </Col>
          <Col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
            {!isMobile && menu}
          </Col>
        </Row>
      </header>
    )
  }
}

Header.propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
  // roles: PropTypes.arrayOf(PropTypes.string),
  activeNav: PropTypes.string,
  // isMobile: PropTypes.bool.isRequired,
}

Header.defaultProps = {
  activeNav: '',
  // roles: [],
}

export default Header
