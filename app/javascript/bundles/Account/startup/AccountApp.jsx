import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Divider } from 'antd'

import Layout from '../../../shared/components/Layout'
import PasswordForm from '../components/PasswordForm'
import EmailForm from '../components/EmailForm'

const Account = ({ minimumPasswordLength, currentEmail, ...props }) => (
  <Layout {...props}>
    <div className="account-wrapper">
      <Row type="flex" justify="center" style={{ padding: '35px 0' }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <h3>Cambiar contraseña</h3>
          <PasswordForm minimumPasswordLength={minimumPasswordLength} />
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Divider />
          <h3>Cambiar correo</h3>
          <EmailForm currentEmail={currentEmail} />
        </Col>
      </Row>
    </div>
  </Layout>
)

Account.propTypes = {
  minimumPasswordLength: PropTypes.number,
  currentEmail: PropTypes.string.isRequired,
}

Account.defaultProps = {
  minimumPasswordLength: 6,
}

export default Account
