import React from 'react'
import { Modal, Button, Form, Input, Radio } from 'antd'
import moment from 'moment'

const FormItem = Form.Item

class FormModal extends React.Component {
  render() {

    const { visible, onOk, onCancel, showModal, form, slots = [null, null] } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        title={`Crear reservación ${moment(slots[0]).format('MMMM d, h:mm a')}`}
        // title="Crear reservacion"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(FormModal)
