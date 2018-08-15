import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Modal,
  DatePicker,
  TimePicker,
  Spin,
} from 'antd'
import moment from 'moment'
import { bussySlotsSpecialist } from '../api'
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

function getUniqueValuesOfKey(array, key) {
  return array.reduce((carry, item) => {
    if (item[key] && !~carry.indexOf(item[key])) carry.push(item[key])
    return carry
  }, [])
}

class FormModal extends React.Component {
  state = {
    specialistSchedule: {
      schedule: [],
      fetching: false,
    },
  }
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

  handleDateChange = (_, dateString) => {
    const { form, services } = this.props
    const { getFieldValue } = form
    const specialistId = getFieldValue('specialist')
    const serviceSelected = services.find(s => s.id === getFieldValue('service'))
    console.log(getFieldValue('service'), serviceSelected)
    // const durationMin = serviceSelected.attributes.durationMin
    const { attributes } = serviceSelected
    const { durationMin } = attributes
    this.setState({ specialistSchedule: { schedule: [], fetching: true } })
    bussySlotsSpecialist(
      specialistId,
      dateString.split('/').join('-'),
      durationMin,
      (data) => {
        console.log(data)
        this.setState({
          specialistSchedule: {
            schedule: data,
            fetching: false,
          },
        })
      },
      error => console.log(error),
    )
  }

  disabledHours = () => {
    const { specialistSchedule } = this.state
    const { schedule } = specialistSchedule
    const disabledHours = schedule // .filter(s => s.bussy)
      .reduce((carry, item) => {
        if (carry[item.hour] && carry[item.hour] === false) return carry
        if (!item.bussy) {
          const res = carry
          res[item.hour] = false
          return res
        }
        const res = carry
        res[item.hour] = true
        return res
      }, {})
    console.log(disabledHours)
    // return Object.keys(disabledHours)
    return Object.keys(disabledHours)
      .filter(x => disabledHours[x] !== false)
      .map(s => Number(s))
  }

  render() {
    const {
      specialistSchedule,
    } = this.state
    const { fetching } = specialistSchedule
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
    const title = `Editar de reservación para ${appointment.attributes.clientName} - ${appointmentDate}`
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
              initialValue: String(appointment.attributes.serviceId),
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
              initialValue: String(appointment.attributes.specialistId),
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
              // initialValue: moment(appointment.startTime, dateFormat),
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker
                // showTime
                onChange={this.handleDateChange}
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
              // initialValue: moment(appointment.startTime),
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <TimePicker
                disabled={fetching}
                minuteStep={serviceSelected.attributes.durationMin}
                // defaultValue={moment(formatTime)}
                format={formatTime}
                disabledHours={this.disabledHours}
                disabledMinutes={() => range(30, 60)}
              />,
            )}
            { fetching
            && (
              <span>
                &nbsp;
                <Spin />
              </span>
            )
            }
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
