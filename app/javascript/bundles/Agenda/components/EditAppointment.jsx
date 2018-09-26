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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { bussySlotsSpecialist } from '../../../api'

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

const dateFormat = 'YYYY-MM-DD'
const formatTime = 'hh:mm'

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day').subtract(1, 'days')
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

function getNonWorkingHours() {
  return range(0, 8).concat(range(18, 24))
}

class FormModal extends React.Component {
  state = {
    specialistSchedule: {
      schedule: [],
      fetching: false,
    },
  }

  componentDidMount() {
    const { form } = this.props
    const { getFieldsValue } = form
    // setFieldsValue({
    //   service: String(appointment.attributes.serviceId),
    //   specialist: String(appointment.attributes.specialistId),
    //   date: moment(),
    // })
    const { service, specialist, date } = getFieldsValue(['service', 'specialist', 'date'])
    this.fetchBussySlotsSpecialist(service, specialist, date.format(dateFormat))
  }

  handleServiceChange = (service) => {
    // const { form } = this.props
    const { form, services } = this.props
    const { getFieldsValue } = form
    const { specialist, date } = getFieldsValue(['specialist', 'date'])
    const serviceObject = services.find(s => s.id === service)
    const { attributes } = serviceObject
    form.setFieldsValue({
      specialist: attributes.specialists[0],
    })
    this.fetchBussySlotsSpecialist(specialist, service, date.format(dateFormat))
  }

  handleSpecialistChange = (specialist) => {
    const { form } = this.props
    const { getFieldsValue } = form
    const { service, date } = getFieldsValue(['service', 'date'])
    this.fetchBussySlotsSpecialist(specialist, service, date.format(dateFormat))
  }

  handleDateChange = (_, dateString) => {
    const { form } = this.props
    const { getFieldsValue } = form
    const { service, specialist } = getFieldsValue(['service', 'specialist'])
    this.fetchBussySlotsSpecialist(specialist, service, dateString)
  }

  disabledHours = () => {
    const { specialistSchedule } = this.state
    const { schedule } = specialistSchedule
    const currentTime = new Date()
    const disabledHours = schedule // .filter(s => s.bussy)
      .reduce((carry, item) => {
        const res = carry
        if (item.hour in res && res[item.hour] === false) return res
        if (item.bussy || currentTime > item.slot) {
          res[item.hour] = true
          return res
        }
        res[item.hour] = false
        return res
      }, {})
    return Object.keys(disabledHours)
      .filter(x => disabledHours[x])
      .map(s => Number(s))
      .concat(getNonWorkingHours())
  }

  disabledMinutes = (selectedHour) => {
    const { specialistSchedule } = this.state
    const { schedule } = specialistSchedule
    return schedule
      .filter(s => s.hour === selectedHour && s.bussy)
      .map(s => Number(s.minute))
  }

  fetchBussySlotsSpecialist(specialist, service, date) {
    this.setState({ specialistSchedule: { schedule: [], fetching: true } })
    bussySlotsSpecialist(
      specialist,
      service,
      date,
      (data) => {
        this.setState({
          specialistSchedule: {
            schedule: data,
            fetching: false,
          },
        })
      },
      error => console.warn(error),
    )
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
    const appointmentDate = moment(appointment.attributes.startTime).format('MMMM DD, h:mm a')
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
          {/* {getFieldDecorator('serviceDurationMin', { hidde: true })} */}
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
              <Select onChange={this.handleSpecialistChange}>
                {specialistsOptions}
              </Select>,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Fecha"
          >
            {getFieldDecorator('date', {
              initialValue: moment(),
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
                hideDisabledOptions
                disabledHours={this.disabledHours}
                disabledMinutes={this.disabledMinutes}
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
