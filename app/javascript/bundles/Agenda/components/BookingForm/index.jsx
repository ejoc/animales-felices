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
      // specialistsByService,
    } = this.props
    const { getFieldDecorator, getFieldValue } = form
    // const currentService = getFieldValue('service')
    // const currentService = services.find(s => s.id === this.props.service.value)

    const serviceField = getFieldValue('service') || (services[0] && services[0].id) || ''

    const serviceSelected = services.find(s => s.id === serviceField)
    let specialistsIds = []
    if (serviceSelected) {
      specialistsIds = serviceSelected.attributes.specialists
    }

    const specialistsOptions = specialists
      .filter(s => specialistsIds.includes(String(s.id)))
      .map(s => (
        <Option
          key={s.id}
          value={s.id}
        >
          {s.attributes.name}
        </Option>
      ))

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
            initialValue: serviceField,
            rules: [{ required: true, message: 'Por favor seleccione el servicio!' }],
          })(
            <Select onChange={this.handleServiceChange}>
              {services.map(service => (
                <Option
                  key={service.id}
                  value={service.id}
                >
                  {service.attributes.name}
                </Option>
              ))}
            </Select>,
          )}
          {serviceSelected && (
            <span>
              {`Duración del servicio: ${serviceSelected.attributes.durationMin} minutos`}
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
              {specialistsOptions}
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
  specialistsByService: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
