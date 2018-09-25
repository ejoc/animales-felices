import React from 'react'
import {
  Form,
  Input,
  Row,
  Col,
} from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 18 },
  },
}

const FormItem = Form.Item

// class ClientForm extends React.Component {
//   render() {
//     <Form>
//       <FormItem label="Cedula">
//         {getFieldDecorator('noi', {
//           rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
//         })(
//           <Input />
//         )}
//       </FormItem>
//     </Form>
//   }
// }

const ClientForm = ({ form }) => {
  const { getFieldDecorator } = form
  return (
    <Form>
      <Row gutter={16}>
        <Col span={12}>
          <FormItem label="Cedula" {...formItemLayout}>
            {getFieldDecorator('noi', {
              rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
            })(
              <Input />,
            )}
          </FormItem>

          <FormItem label="Nombre" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
            })(
              <Input />,
            )}
          </FormItem>

          <FormItem label="Email" {...formItemLayout}>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
            })(
              <Input />,
            )}
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem label="Telefono" {...formItemLayout}>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
            })(
              <Input />,
            )}
          </FormItem>

          <FormItem label="Direccion" {...formItemLayout}>
            {getFieldDecorator('address')(
              <Input />,
            )}
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(ClientForm)
