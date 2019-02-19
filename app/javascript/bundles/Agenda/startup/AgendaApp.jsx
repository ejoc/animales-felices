import { Card, Col, Modal, notification, Row } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import {
  bookingAppointment,
  cancelAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
} from '../../../api'
import Layout from '../../../shared/components/Layout'
import { getFieldErrors } from '../../../utils/utils'
import Agenda from '../components/Agenda'
import BookAppointment from '../components/BookAppointment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import EditAppointment from '../components/EditAppointment'
import FilterPanel from '../components/FilterPanel'
import ShowAppointment from '../components/ShowAppointment'

moment.locale('es')

const localizer = BigCalendar.momentLocalizer(moment)
// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class AgendaApp extends Component {
  constructor(props) {
    super(props)
    const { events, services, specialists } = props
    this.state = {
      events: events
        ? events.map(event => ({
            id: event.id,
            ...event.attributes,
            startTime: new Date(event.attributes.startTime),
            endTime: new Date(event.attributes.endTime),
          }))
        : [],
      submitting: false,
      filters: {
        canceled: false,
        concluded: false,
      },
      services: services.data,
      specialists: specialists.data,
      appointmentSelected: null,
      modals: {
        newAppointment: false,
        showAppointment: false,
        editAppointment: false,
      },
    }
  }

  componentDidMount() {
    const currentDay = new Date()
    this.fetchAppointments(currentDay)
  }

  /*
   * Modal
   */
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  saveEditFormRef = formRef => {
    this.editFormRef = formRef
  }

  handleBookAppointment = e => {
    e.preventDefault()
    const { form } = this.formRef.props
    const { currentSlots } = this.state
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true })
        const fields = {
          serviceId: values.service,
          specialistId: values.specialist,
          clientName: values.clientFields.name,
          clientEmail: values.clientFields.email,
          clientPhone: values.clientFields.phone,
          remark: values.remark,
          startTime: currentSlots[0],
          endTime: currentSlots[1],
        }
        bookingAppointment(
          fields,
          event => {
            this.setState(prevState => ({
              submitting: false,
              modals: { ...prevState.modals, newAppointment: false },
              events: prevState.events.concat(event),
            }))
            form.resetFields()
            notification.success({
              message: 'Reservación creada exitosamente!',
              description: 'Reservación creada de manera exitosa!',
            })
          },
          errors => {
            const errorsData = errors.response.data
            const fieldErrors = getFieldErrors(errorsData, values)
            form.setFields(fieldErrors)
            this.setState({ submitting: false })
          }
        )
      }
    })
  }

  handleCancel = e => {
    e.preventDefault() // eliminar si es necesario
    this.setState(prevState => ({
      modals: { ...prevState.modals, newAppointment: false },
    }))
    const { form } = this.formRef.props
    form.resetFields()
  }

  hideAppointment = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showAppointment: false },
    }))
  }

  hideEditAppointment = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, editAppointment: false },
    }))
  }

  /*
   * Appointment Filter
   */
  handleCanceledClick = e => {
    this.setState(prevState => ({
      filters: { ...prevState.filters, canceled: e.target.checked },
    }))
  }

  handleConcludedClick = e => {
    this.setState(prevState => ({
      filters: { ...prevState.filters, concluded: e.target.checked },
    }))
  }

  /*
   * Specialist Filter
   */
  handleSpecialistClick = ({ key }) => {
    this.setState(prevState => ({
      filters: { ...prevState.filters, specialistId: key },
    }))
  }

  viewAllSpecialists = e => {
    e.preventDefault()
    this.setState(prevState => ({
      filters: { ...prevState.filters, specialistId: null },
    }))
  }

  /*
   * Service Filter
   */
  handleServiceClick = ({ key }) => {
    this.setState(prevState => ({
      filters: { ...prevState.filters, serviceId: key },
    }))
  }

  viewAllServices = e => {
    e.preventDefault()
    this.setState(prevState => ({
      filters: { ...prevState.filters, serviceId: null },
    }))
  }

  /*
   * Agenda
   */
  handleNavigate = day => {
    this.fetchAppointments(day)
  }

  createBooking = ({ slots }) => {
    if (slots[0] < new Date()) {
      Modal.error({
        title: 'Ops... Aun no viajamos en el tiempo',
        content: `puedes reservar desde ${moment().format('lll')}`,
      })
    } else {
      this.setState(prevState => ({
        modals: { ...prevState.modals, newAppointment: true },
        currentSlots: slots,
        // currentSlotInfo: slotInfo,
      }))
    }
  }

  handleCalendarSelect = day => this.fetchAppointments(day.toDate())

  handleCancelAppointment = () => {
    // e.preventDefault() // eliminar si es necesario
    this.setState({
      cancelLoading: true,
    })
    const {
      appointmentSelected: { id },
    } = this.state
    cancelAppointment(id).then(
      ({ data }) => {
        notification.success({
          message: 'Reservación cancelada exitosamente!',
          // description: 'Reservación creada de manera exitosa!',
        })

        this.setState(prevState => ({
          modals: { ...prevState.modals, showAppointment: false },
          cancelLoading: false,
          events: prevState.events.map(event => {
            if (Number(event.id) === Number(data)) {
              return { ...event, canceled: true }
            }
            return event
          }),
        }))
      },
      error => console.log(error)
    )
  }

  handleEditAppointment = () => {
    this.setState(prevState => ({
      modals: {
        ...prevState.modals,
        showAppointment: false,
        editAppointment: true,
      },
    }))
  }

  handleUpdateAppointment = e => {
    e.preventDefault()
    const { form } = this.editFormRef.props
    const { appointmentSelected } = this.state
    form.validateFields((err, values) => {
      if (!err) {
        // this.setState({ submitting: true })
        const startTime = values.date.set({
          hour: values.time.get('hour'),
          minute: values.time.get('minute'),
          second: 0,
        })
        // .toDate()
        // .format('YYYY-MM-DD HH:mm')
        const fields = {
          serviceId: values.service,
          specialistId: values.specialist,
          startTime,
          // endTime: currentSlots[1],
        }

        updateAppointment(
          appointmentSelected.id,
          fields,
          event => {
            this.setState(prevState => ({
              submitting: false,
              modals: { ...prevState.modals, editAppointment: false },
              events: prevState.events.map(appointment =>
                appointment.id === appointmentSelected.id
                  ? { ...appointment, ...event }
                  : appointment
              ),
            }))
            form.resetFields()
            notification.success({
              message: 'Reservación actualizada exitosamente!',
              description: 'Reservación actualizada de manera exitosa!',
            })
          },
          errors => {
            const errorsData = errors.response.data
            const fieldErrors = getFieldErrors(errorsData, values)
            form.setFields(fieldErrors)
            this.setState({ submitting: false })
          }
        )
      }
    })
  }

  handleShowAppointment = event => {
    const appointmentId = event.id
    this.setState(prevState => ({
      modals: { ...prevState.modals, showAppointment: true },
      appointmentSelected: { loading: true },
    }))

    getAppointment(
      appointmentId,
      appointment => {
        this.setState(prevState => {
          const service = prevState.services.find(
            s => Number(s.id) === Number(appointment.attributes.serviceId)
          )
          const specialist = prevState.specialists.find(
            s => Number(s.id) === Number(appointment.attributes.specialistId)
          )
          return {
            appointmentSelected: {
              id: appointment.id,
              attributes: appointment.attributes,
              service: { ...service.attributes },
              specialist: { ...specialist.attributes },
              loading: false,
            },
          }
        })
      },
      error => console.warn(error)
    )
  }

  fetchAppointments(day) {
    const date = moment(day).format('l')
    this.setState({ fetching: true })
    getAppointments(
      date,
      events => {
        this.setState({
          events,
          day,
          fetching: false,
        })
      },
      error => console.warn(error)
    )
  }

  render() {
    const {
      modals,
      currentSlots,
      events,
      submitting,
      appointmentSelected,
      day,
      cancelLoading,
      fetching,
      filters,
      services,
      specialists,
    } = this.state

    const { newAppointment, showAppointment, editAppointment } = modals
    const { specialistsByService, isUserAdmin, ...rest } = this.props

    const filterKeys = Object.keys(filters)
    const currentTime = new Date()
    const showEvents = events.filter(event =>
      filterKeys.every(eachKey => {
        if (filters[eachKey] === null) {
          return true
        }
        if (eachKey === 'canceled' && filters[eachKey]) {
          return true
        }
        if (eachKey === 'concluded') {
          return filters[eachKey] ? true : event.endTime > currentTime
        }
        return Number(filters[eachKey]) === Number(event[eachKey])
      })
    )

    return (
      <Layout {...rest} isUserAdmin={isUserAdmin} activeNav="agenda">
        <div
          style={{
            padding: '10px 10px 20px 10px',
            minHeight: '100vh',
            backgroundColor: '#F4F4F4',
          }}
        >
          <Row gutter={8}>
            <Col span={5} style={{ height: '90vh', overflowY: 'scroll' }}>
              <FilterPanel
                filters={filters}
                handleCalendarSelect={this.handleCalendarSelect}
                onCanceledClick={this.handleCanceledClick}
                onConcludedClick={this.handleConcludedClick}
                handleSpecialistClick={this.handleSpecialistClick}
                specialists={specialists}
                viewAllSpecialists={this.viewAllSpecialists}
                handleServiceClick={this.handleServiceClick}
                services={services}
                viewAllServices={this.viewAllServices}
                isUserAdmin={isUserAdmin}
              />
            </Col>
            <Col
              span={19}
              // style={{ height: '600px' }}
            >
              <Card className={fetching ? 'fetching' : ''}>
                <Agenda
                  localizer={localizer}
                  events={showEvents}
                  date={day || new Date()}
                  // onEventDrop={this.moveEvent}
                  // onEventResize={this.resizeEvent}
                  // slotPropGetter={() => {}}
                  // scrollToTime={new Date()}
                  onSelectSlot={this.createBooking}
                  onSelectEvent={this.handleShowAppointment}
                  onNavigate={this.handleNavigate}
                />
              </Card>
            </Col>
          </Row>

          {showAppointment && (
            <ShowAppointment
              visible={showAppointment}
              appointment={appointmentSelected}
              onCancel={this.hideAppointment}
              onCancelAppointment={this.handleCancelAppointment}
              onEditAppointment={this.handleEditAppointment}
              cancelLoading={cancelLoading}
            />
          )}

          {editAppointment && (
            <EditAppointment
              wrappedComponentRef={this.saveEditFormRef}
              visible={editAppointment}
              appointment={appointmentSelected}
              onOk={this.handleUpdateAppointment}
              onCancel={this.hideEditAppointment}
              onCancelAppointment={this.handleCancelAppointment}
              onEditAppointment={this.handleEditAppointment}
              cancelLoading={cancelLoading}
              services={services}
              specialists={specialists}
              specialistsByService={specialistsByService}
            />
          )}

          <BookAppointment
            title={`Crear reservación ${currentSlots &&
              moment(currentSlots[0]).format('lll')}`}
            visible={newAppointment}
            onOk={this.handleBookAppointment}
            onCancel={this.handleCancel}
            submitting={submitting}
            wrappedComponentRef={this.saveFormRef}
            services={services}
            specialists={specialists}
            specialistsByService={specialistsByService}
          />
        </div>
      </Layout>
    )
  }
}

AgendaApp.propTypes = {
  services: PropTypes.shape().isRequired,
  specialists: PropTypes.shape().isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  specialistsByService: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

AgendaApp.defaultProps = {
  events: [],
}

export default AgendaApp
