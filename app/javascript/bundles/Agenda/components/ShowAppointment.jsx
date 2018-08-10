import React from 'react'
import {
  Modal,
  Button,
  Row,
  Col,
  Spin,
  Popconfirm,
} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

const ShowAppointment = ({
  visible,
  onOk,
  onCancel,
  onCancelAppointment,
  cancelLoading,
  onEditAppointment,
  appointment: {
    loading,
    attributes,
    service,
    specialist,
  },
}) => (
  <Modal
    title="Detalle de reservación"
    // title="Crear reservacion"
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    // okButtonProps={{ disabled: true }}
    footer={[
      <Popconfirm
        key="back"
        // placement="topLeft"
        title="Seguro que desea cancelar la reservación?"
        okType="danger"
        onConfirm={onCancelAppointment}
        okText="Si"
        cancelText="No"
      >
        <Button
          type="danger"
          // onClick={this.handleCancelAppointment}
          // disabled={loading}
          loading={cancelLoading}
        >
          Cancelar reservación
        </Button>
      </Popconfirm>,
      <Button key="submit" onClick={onEditAppointment} disabled={loading}>
        Modificar reservación
      </Button>,
    ]}
  >
    {loading ? (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    ) : (
      <div>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Servicio:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {service.name}
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Duración servicio:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {service.durationMin} minutos
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Personal:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {specialist.name}
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Horario:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {moment(attributes.startTime).format('LLLL')}
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Nombre cliente:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {attributes.clientName}
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Email cliente:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {attributes.clientEmail}
            </p>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <p style={{ textAlign: 'right' }}>
              <strong>
                Email telefono:
              </strong>
            </p>
          </Col>
          <Col span={16}>
            <p>
              {attributes.clientPhone}
            </p>
          </Col>
        </Row>
      </div>
    )}
  </Modal>
)

ShowAppointment.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string,
    attributes: PropTypes.shape(),
    loading: PropTypes.bool,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  // onOk: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default ShowAppointment
