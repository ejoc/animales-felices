import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {
  Menu,
  // Icon,
  Popover,
  Avatar,
} from 'antd'

class AccountNavigation extends Component {
  state = {
    menuVisible: false,
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
    const { isUserAdmin } = this.props

    const menu = (
      <Menu>
        {isUserAdmin && (
          <Menu.Item key="admin">
            <a href="/admin" target="_blank">
              <span>Mantenimiento</span>
            </a>
          </Menu.Item>
        )}
        <Menu.Item key="account">
          <a href="/cuenta">
            <span>Mi cuenta</span>
          </a>
          {/* <span>
            CAMBIAR CONTRASEÑA
          </span> */}
        </Menu.Item>
        {/* <Menu.Divider /> */}
        <Menu.Item key="logout">
          <a href="/users/sign_out" data-method="delete" rel="nofollow">
            <span>Cerrar sesión</span>
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div>
        <Popover
          key="avatar"
          overlayClassName="popover-account"
          placement="bottomRight"
          content={menu}
          trigger="click"
          visible={menuVisible}
          arrowPointAtCenter
          onVisibleChange={this.handleMenuVisibleChange}
        >
          <Avatar
            size="large"
            icon="user"
            style={{
              color: '#fff',
              // backgroundColor: '#f5222d',
              cursor: 'pointer',
            }}
            onClick={this.handleShowMenu}
          />
        </Popover>
      </div>
    )
  }
}

// AccountNavigation.propTypes = {
//   roles: PropTypes.arrayOf(PropTypes.string),
// }

// AccountNavigation.defaultProps = {
//   roles: [],
// }

export default AccountNavigation
