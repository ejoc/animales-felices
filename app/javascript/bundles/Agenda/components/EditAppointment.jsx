import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Modal,
  DatePicker,
  TimePicker,
} from 'antd'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

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

const dateFormat = 'YYYY/MM/DD'
const formatTime = 'hh:mm'

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}


function range(start, end) {
  const result = []
  for (let i = start; i < end; i += 1) {
    result.push(i)
  }
  return result
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  }
}

class FormModal extends React.Component {
  // componentDidMount() {
  //   const { form, appointment } = this.props
  //   const { setFieldsValue } = form
  //   setFieldsValue({
  //     service: String(appointment.serviceId),
  //     specialist: String(appointment.specialistId),
  //   })
  // }

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
      visible,
      onOk,
      onCancel,
      appointment,
    } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const appointmentDate = moment(appointment.startTime).format('MMMM DD, h:mm a')
    const title = `Editar de reservación para ${appointment.clientName} - ${appointmentDate}`
    const serviceField = getFieldValue('service') || (services[0] && services[0].id) || ''

    const serviceSelected = services.find(s => s.id === serviceField)
    let specialistsIds = []
    if (serviceSelected) {
      specialistsIds = serviceSelected.attributes.specialists
    }
    console.log(moment(appointment.startTime, formatTime))

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
      <Modal
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
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
              initialValue: String(appointment.serviceId),
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
            <span>
              {`Duración del servicio: ${serviceSelected.attributes.durationMin} minutos`}
            </span>
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
              initialValue: String(appointment.specialistId),
              rules: [{ required: true, message: 'Por favor seleccione el especialista!' }],
            })(
              <Select onChange={this.handleSelectChange}>
                {specialistsOptions}
              </Select>,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Fecha"
          >
            {getFieldDecorator('date', {
              initialValue: moment(appointment.startTime, dateFormat),
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker
                // showTime
                format={dateFormat}
                disabledDate={disabledDate}
              />,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Hora"
          >
            {getFieldDecorator('time', {
              initialValue: moment(appointment.startTime),
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <TimePicker
                minuteStep={serviceSelected.attributes.durationMin}
                // defaultValue={moment(formatTime)}
                format={formatTime}
                disabledHours={() => range(0, 24).splice(4, 20)}
                disabledMinutes={() => range(30, 60)}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

FormModal.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  specialists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  specialistsByService: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  form: PropTypes.shape().isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Form.create()(FormModal)
