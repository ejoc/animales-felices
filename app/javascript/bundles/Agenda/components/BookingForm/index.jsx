import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUser, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

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
}

class FormModal extends React.Component {
  handleServiceChange = () => {
    const { form } = this.props
    form.setFieldsValue({
      specialist: '',
    })
  }

  render() {
    const {
      form,
      specialists,
      services,
      // slots = [null, null],
    } = this.props
    const { getFieldDecorator, getFieldValue } = form
    // const currentService = getFieldValue('service')
    // const currentService = services.find(s => s.id === this.props.service.value)
    const firstService = (services[0] && services[0].id) || ''
    const serviceSelected = getFieldValue('service') || firstService
    const currentService = services.find(s => s.id === serviceSelected)
    return (
      <Form>
        <FormItem
          label={(
            <span>
              Servicio &nbsp;
              <FontAwesomeIcon icon={faCalendarCheck} />
            </span>
          )}
          {...formItemLayout}
        >
          {getFieldDecorator('service', {
            initialValue: firstService,
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
            </Select>,
          )}
          {currentService && (
            <span>
              {`Duración del servicio: ${currentService.duration_min} minutos`}
            </span>
          )}
        </FormItem>

        {/* {getFieldDecorator('serviceDurationMin', { hidde: true })} */}
        <FormItem
          label={(
            <span>
              Especialista &nbsp;
              <FontAwesomeIcon icon={faUsers} />
            </span>
          )}
          {...formItemLayout}
        >
          {getFieldDecorator('specialist', {
            rules: [{ required: true, message: 'Por favor seleccione el especialista!' }],
          })(
            <Select onChange={this.handleSelectChange}>
              {specialists
                .filter(specialist => specialist.service_id === serviceSelected)
                .map(specialist => (
                  <Option key={specialist.id} value={specialist.id}>
                    {specialist.name}
                  </Option>
                ))
              }
            </Select>,
          )}
        </FormItem>

        <FormItem
          label={(
            <span>
              Cliente &nbsp;
              <FontAwesomeIcon icon={faUser} />
            </span>)}
          {...formItemLayout}
        >
          {getFieldDecorator('clientFields', {
            initialValue: { name: '', phone: '', email: '' },
            rules: [{ required: true, message: 'Por favor digite el nombre del cliente' }],
          })(<ClientInput placeholder="input search text" />)}
        </FormItem>
      </Form>
    )
  }
}

FormModal.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  specialists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  form: PropTypes.shape().isRequired,
}

export default Form.create()(FormModal)

// export default Form.create({
//   onFieldsChange(props, changedFields) {
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     return {
//       // specialist: Form.createFormField({
//       //   ...props.specialist,
//       //   value: props.specialist.value,
//       // }),
//       service: Form.createFormField({
//         ...props.service,
//         value: props.service.value,
//         duration_min: props.service.duration_min,
//       }),
//       specialist: Form.createFormField({
//         ...props.specialist,
//         value: props.specialist.value,
//       }),
//       clientFields: Form.createFormField({
//         ...props.clientFields,
//         value: props.clientFields.value,
//       }),
//     };
//   },
//   onValuesChange(_, values) {
//     console.log(values);
//   },
// })(FormModal)
