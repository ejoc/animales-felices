import React, { Component } from 'react'
import {
  Modal,
  Button,
  Row,
  Col,
  Spin,
  notification,
} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import { getAppointment, cancelAppointment } from '../api'

class ShowEvent extends Component {
  _mounted = false

  state = {
    // appointmentId: null,
    // attributes: {},
    loading: true,
    cancelLoading: false,
  }

  componentDidMount() {
    this._mounted = true
    this.fetchAppointment()
  }

  componentWillUnmount() {
    this._mounted = false
    // if (this.asyncRequest) {
    //   this.asyncRequest.cancel()
    // }
  }

  handleCancel = (e) => {
    e.preventDefault() // eliminar si es necesario
    this.setState({
      cancelLoading: true,
    })
    const { onCancel, appointmentId } = this.props
    cancelAppointment(appointmentId).then(
      ({ data }) => {
        notification.success({
          message: 'Reservación cancelada exitosamente!',
          description: 'Reservación creada de manera exitosa!',
        })
        onCancel()
      },
      error => console.log(error),
    )
  }

  fetchAppointment() {
    // // cancel the previous request
    // if (typeof this._source !== typeof undefined) {
    //   this._source.cancel('Operation canceled due to new request.')
    // }

    // this._source = axios.CancelToken.source()
    const { appointmentId } = this.props
    // this.setState({ loading: true })
    getAppointment(appointmentId)
      .then(
        ({ data }) => {
          if (!this._mounted) {
            return
          }
          // const {
          //   attributes,
          //   relationships,
          // } = data
          // const event = {
          //   attributes,
          //   relationships,
          //   included: included.reduce((prev, item) => {
          //     const result = prev
          //     result[item.type] = { id: item.id, attributes: { ...item.attributes } }
          //     return result
          //   }, {}),
          // }
          console.log(data.data)
          this.setState({
            event: data.data.attributes,
            loading: false,
          })
        },
        (error) => {
          console.log(error)
        },
      )
  }
  

  render() {
    const {
      visible,
      onOk,
      onCancel,
    } = this.props
    console.log(this.state)
    const {
      loading,
      cancelLoading,
    } = this.state

    return (
      <Modal
        title="Detalle de reservación"
        // title="Crear reservacion"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        // okButtonProps={{ disabled: true }}
        footer={[
          <Button
            key="back"
            type="danger"
            onClick={this.handleCancel}
            disabled={loading}
            loading={cancelLoading}
          >
            Cancelar reservación
          </Button>,
          <Button key="submit" onClick={onOk} disabled={loading}>
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
                  {this.state.event.service.name}
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
                  {this.state.event.service.duration_min} minutos
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
                  {this.state.event.specialist.name}
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
                  {moment(this.state.event.startTime).format('LLLL')}
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
                  {this.state.event.clientName}
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
                  {this.state.event.clientEmail}
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
                  {this.state.event.clientPhone}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    )
  }
}

ShowEvent.propTypes = {
  appointmentId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  // onOk: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default ShowEvent
