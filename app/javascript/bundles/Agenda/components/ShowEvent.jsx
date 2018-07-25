import React, { Component } from 'react'
import { Modal, Button } from 'antd'

class ShowEvent extends Component {
  state = {
    event: {},
    loading: true,
  }
  componentDidMount() {
    
  }

  render() {
    const {
      visible,
      onOk,
      onCancel,
    } = this.props
    return (
      <Modal
        title={`Crear reservación ${currentSlots && moment(currentSlots[0]).format('MMMM DD, h:mm a')}`}
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
        <BookingForm
          wrappedComponentRef={this.saveFormRef}
          services={services}
          specialists={specialists}
          // {...fields}
          // onChange={this.handleFormChange}
          // slots={currentSlots}
          // visible={bookingFormVisible}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
        />
      </Modal>
    )
  }
}

export default ShowEvent
