import React from 'react'
import {
  Row,
  Col,
  Card,
  Divider,
} from 'antd'

import ClientForm from '../components/ClientForm'
import InvoiceFooter from '../components/InvoiceFooter'

class InvoiceApp extends React.Component {
  state = {
    items: [],
  }

  render() {
    const { items } = this.state
    return (
      <div style={{ padding: '50px', height: '700px' }}>
        <Card title="Datos del cliente">
          <ClientForm />

          <Divider />

          <Row>
            <Col>
              <h3>Items</h3>
            </Col>
          </Row>

          <Row>
            <Col offset={16}>
              <InvoiceFooter />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default InvoiceApp
