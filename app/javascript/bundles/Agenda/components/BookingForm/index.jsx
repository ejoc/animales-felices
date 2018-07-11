import React from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

import ClientInput from './ClientInput'

const FormItem = Form.Item

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class FormModal extends React.Component {
  handleServiceChange = (value) => {
    this.props.form.setFieldsValue({
      specialist: '',
    })
  }
  render() {
    console.log(this.props)
    const {
      visible,
      onOk,
      onCancel,
      showModal,
      form,
      specialists,
      services,
      slots = [null, null],
    } = this.props
    const { getFieldDecorator } = form
    const currentService = services.find(s => s.id === this.props.service.value)
    return (
      <Form>
        <FormItem label={<span>Servicio <FontAwesomeIcon icon={faCalendarCheck}/></span>} {...formItemLayout} >
          {getFieldDecorator('service', {
            rules: [{ required: true, message: 'Por favor seleccione el servicio!' }],
          })(
            <Select onChange={this.handleServiceChange}>
              {services.map(service => (
                <Option
                  key={service.id}
                  value={service.id}
                >
                  {service.name}
                </Option>  
              ))}
            </Select>
          )}
          {currentService && <span>Duración del servicio: {currentService.duration_min} minutos</span> }
        </FormItem>
        <FormItem label={<span>Especialista <FontAwesomeIcon icon={faUserMd}/></span>} {...formItemLayout}>
          {getFieldDecorator('specialist', {
            rules: [{ required: true, message: 'Por favor seleccione el especialista!' }],
          })(
            <Select>
              {specialists.filter(specialist => specialist.service_id === this.props.service.value).map(specialist => (
                <Option key={specialist.id} value={specialist.id}>{specialist.name}</Option>  
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem label={<span>Cliente <FontAwesomeIcon icon={faUserMd}/></span>} {...formItemLayout}>
          {getFieldDecorator('clientFields', {
            rules: [{ required: true, message: 'Por favor digite el nombre del cliente' }],
          })(
            <ClientInput placeholder="input search text" />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      // specialist: Form.createFormField({
      //   ...props.specialist,
      //   value: props.specialist.value,
      // }),
      service: Form.createFormField({
        ...props.service,
        value: props.service.value,
        duration_min: props.service.duration_min,
      }),
      specialist: Form.createFormField({
        ...props.specialist,
        value: props.specialist.value,
      }),
      clientFields: Form.createFormField({
        ...props.clientFields,
        value: props.clientFields.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(FormModal)
