import React from 'react'
import { Row, Col } from 'antd'

const InvoiceFooter = ({ subtotal, total, iva }) => (
  <div style={{ paddingTop: '20px' }}>
    <Row>
      <Col span={18}>
        <span>
          Subtotal
        </span>
      </Col>
      <Col span={6}>
        {`$ ${subtotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Col>
    </Row>
    <Row>
      <Col span={18}>
        <span>
          Iva
        </span>
      </Col>
      <Col span={6}>
        {`$ ${iva}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Col>
    </Row>
    <Row>
      <Col span={18}>
        <span>
          Total
        </span>
      </Col>
      <Col span={6}>
        {`$ ${total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Col>
    </Row>
  </div>
)

export default InvoiceFooter
