import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

import { getAppointment } from '../api'

class ShowEvent extends Component {
  state = {
    event: {},
    loading: false,
  }

  componentDidMount() {
    const { appointmentId } = this.props
    this.setState({ loading: true })
    getAppointment(appointmentId)
      .then(
        ({ data }) => {
          this.setState({
            event: data,
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
    return (
      <Modal
        title="Detalle de reservación"
        // title="Crear reservacion"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        // okButtonProps={{ disabled: true }}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancelar Reservación
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            Editar Reservación
          </Button>,
        ]}
      >
        {JSON.stringify(this.state)}
      </Modal>
    )
  }
}

ShowEvent.propTypes = {
  appointmentId: PropTypes.string.isRequired,
}

export default ShowEvent
