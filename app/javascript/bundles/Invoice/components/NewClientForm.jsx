import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 16 },
  },
}

class NewClientForm extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form>
        <FormItem label="Cedula" {...formItemLayout}>
          {getFieldDecorator('cedula', {
            initialValue: '0998051155',
            rules: [
              {
                required: true,
                message: 'Porfavor ingrese el numero de cedula!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="Nombre" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: 'Elias',
            rules: [
              {
                required: true,
                message: 'Porfavor ingrese el nombre!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: 'elias@ups.com',
            rules: [
              { type: 'email', message: 'Ingrese un email valido!' },
              {
                required: true,
                message: 'Porfavor ingrese el numero de cedula!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="Dirección" {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: 'mapasingue',
            rules: [
              {
                required: true,
                message: 'Porfavor ingrese la Dirección!',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem label="Telefono" {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: '2105512',
            rules: [
              {
                required: true,
                message: 'Porfavor ingrese el numero de telefono!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(NewClientForm)
