import React from 'react'
import { Col, Row, Input } from 'antd'

const InvoiceFooter = () => (
  <div>
    <Row>
      <Col className="ant-form-item-label" xs={24} md={4}>
        <span>
          Subtotal: &nbsp;
        </span>
      </Col>
      <Col xs={24} md={18}>
        <span>
          <Input disabled />
        </span>
      </Col>
    </Row>

    <Row>
      <Col className="ant-form-item-label" xs={24} md={4}>
        <span>
          Iva: &nbsp;
        </span>
      </Col>
      <Col xs={24} md={18}>
        <span>
          <Input disabled />
        </span>
      </Col>
    </Row>

    <Row>
      <Col className="ant-form-item-label" xs={24} md={4}>
        <span>
          Total: &nbsp;
        </span>
      </Col>
      <Col xs={24} md={18}>
        <span>
          <Input disabled />
        </span>
      </Col>
    </Row>
  </div>
)

export default InvoiceFooter
