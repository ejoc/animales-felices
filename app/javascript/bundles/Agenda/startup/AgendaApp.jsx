import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
  Modal,
  notification,
  Button,
  Card,
} from 'antd'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import FilterPanel from '../components/FilterPanel'
import BookingForm from '../components/BookingForm'
import Agenda from '../components/Agenda'
import {
  bookingAppointment,
  getAppointments,
  cancelAppointment,
} from '../api'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import ShowEvent from '../components/ShowEvent'

moment.locale('es')
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class AgendaApp extends Component {
  constructor(props) {
    super(props)
    const { events } = props
    // const resources = specialists
    this.state = {
      events: events ? events
        .map(event => ({
          id: event.id,
          ...event.attributes,
          // resourceId: event.resource_id,
          startTime: new Date(event.attributes.startTime),
          endTime: new Date(event.attributes.endTime),
        })) : [],
      bookingFormVisible: false,
      showAppointment: false,
      submitting: false,
      filters: {
        canceled: false,
        // concluded: true,
      },
      // filtersBySpecialist: null,
      // filtersByService: null,
    }
  }

  componentDidMount() {
    const currentDay = new Date()
    this.fetchAppointments(currentDay)
  }

  /*
  * Modal
  */
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  handleOk = (e) => {
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
          // date: currentSlots[0],
          startTime: currentSlots[0],
          endTime: currentSlots[1],

        }
        bookingAppointment(fields).then(
          ({ data }) => {
            form.resetFields()
            notification.success({
              message: 'Reservación creada exitosamente!',
              description: 'Reservación creada de manera exitosa!',
            })
            const response = data.data
            const event = {
              id: response.id,
              ...response.attributes,
              startTime: new Date(response.attributes.startTime),
              endTime: new Date(response.attributes.endTime),
            }
            this.setState(prevState => ({
              submitting: false,
              bookingFormVisible: false,
              events: prevState.events.concat(event),
            }))
          },
          (errors) => {
            form.resetFields()
            const errorsData = errors.response.data
            let fieldErrors
            if (errorsData instanceof Array) {
              fieldErrors = errorsData.map((error) => {
                const fieldError = Object.keys(error)[0]
                return {
                  [fieldError]: {
                    value: values[fieldError],
                    errors: error[fieldError].map(er => new Error(er)),
                  },
                }
              })
            } else {
              const fieldError = Object.keys(errorsData)[0]
              fieldErrors = {
                [fieldError]: {
                  value: values[fieldError],
                  errors: errorsData[fieldError].map(er => new Error(er)),
                },
              }
            }
            form.setFields(fieldErrors)
            this.setState({ submitting: false })
          },
        )
      }
    })
  }

  handleCancel = (e) => {
    e.preventDefault() // eliminar si es necesario
    const { form } = this.formRef.props
    this.setState({
      bookingFormVisible: false,
    })
    form.resetFields()
  }

  hideAppointment = () => {
    this.setState({
      showAppointment: false,
    })
  }

  /*
  * Specialist Filter
  */
  handleSpecialistClick = ({ key }) => {
    this.setState(prevState => ({
      filtersBySpecialist: key,
      filters: { ...prevState.filters, specialistId: key },
    }))
  }

  viewAllSpecialists = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      filtersBySpecialist: null,
      filters: { ...prevState.filters, specialistId: null },
    }))
  }

  /*
  * Service Filter
  */
  handleServiceClick = ({ key }) => {
    this.setState(prevState => ({
      filtersByService: key,
      filters: { ...prevState.filters, serviceId: key },
    }))
  }

  viewAllServices = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      filtersByService: null,
      filters: { ...prevState.filters, serviceId: null },
    }))
  }

  /*
  * Agenda
  */
  handleNavigate = (day) => {
    this.fetchAppointments(day)
  }

  createBooking = (slotInfo) => {
    this.setState({
      bookingFormVisible: true,
      currentSlots: slotInfo.slots,
      // currentSlotInfo: slotInfo,
    })
  }

  handleCalendarSelect = day => this.fetchAppointments(day.toDate())

  handleCancelAppointment = () => {
    // e.preventDefault() // eliminar si es necesario
    this.setState({
      cancelLoading: true,
    })
    const { appointmentSelected } = this.state
    cancelAppointment(appointmentSelected).then(
      ({ data }) => {
        notification.success({
          message: 'Reservación cancelada exitosamente!',
          // description: 'Reservación creada de manera exitosa!',
        })

        this.setState(prevState => ({
          showAppointment: false,
          cancelLoading: false,
          events: prevState.events.map((event) => {
            if (Number(event.id) === Number(data)) {
              return { ...event, canceled: true }
            }
            return event
          }),
        }))
      },
      error => console.log(error),
    )
  }

  handleUpdateAppointment = (e) => {
    
  }

  selectEvent = (event) => {
    this.setState({
      showAppointment: true,
      appointmentSelected: event.id,
    })
  }

  fetchAppointments(day) {
    const date = moment(day).format('l')
    this.setState({ fetching: true })
    getAppointments(date).then(
      ({ data }) => {
        const events = data
          .map(event => ({
            id: event.id,
            ...event.attributes,
            // resourceId: event.resource_id,
            startTime: new Date(event.attributes.startTime),
            endTime: new Date(event.attributes.endTime),
          }))

        this.setState({
          events,
          day,
          fetching: false,
        })
      },
      error => console.error(error),
    )
  }

  render() {
    const {
      bookingFormVisible,
      currentSlots,
      events,
      // specialists,
      submitting,
      filtersBySpecialist,
      filtersByService,
      showAppointment,
      appointmentSelected,
      day,
      cancelLoading,
      fetching,
      filters,
    } = this.state
    const { services, specialists, specialistsByService } = this.props

    const filterKeys = Object.keys(filters)
    const showEvents = events.filter(event => filterKeys.every((eachKey) => {
      if (filters[eachKey] === null) {
        return true
      }
      // console.log(eachKey, filters[eachKey], event[eachKey])
      return filters[eachKey] == (event[eachKey])
    }))

    // let showEvents = filtersBySpecialist
    //   ? events.filter(event => event.resourceId === Number(filtersBySpecialist))
    //   : events

    // showEvents = filtersByService
    //   ? showEvents.filter(event => event.serviceId === Number(filtersByService))
    //   : showEvents
    return (
      <div style={{ padding: '10px', height: '700px' }}>
        <Row gutter={8}>
          <Col span={5}>
            <FilterPanel
              handleCalendarSelect={this.handleCalendarSelect}
              handleSpecialistClick={this.handleSpecialistClick}
              filtersBySpecialist={filtersBySpecialist}
              specialists={specialists}
              viewAllSpecialists={this.viewAllSpecialists}
              handleServiceClick={this.handleServiceClick}
              filtersByService={filtersByService}
              services={services}
              viewAllServices={this.viewAllServices}

            />
          </Col>
          <Col span={19} style={{ height: '600px' }}>
            <Card className={fetching ? 'fetching' : ''}>
              <Agenda
                events={showEvents}
                date={day || new Date()}
                // onEventDrop={this.moveEvent}
                // onEventResize={this.resizeEvent}
                // slotPropGetter={() => {}}
                // scrollToTime={new Date()}
                onSelectSlot={this.createBooking}
                onSelectEvent={this.selectEvent}
                onNavigate={this.handleNavigate}
                // onView={() => console.log('onView')}
                // {...this.props}
              />
            </Card>
          </Col>
        </Row>

        {showAppointment && (
          <ShowEvent
            visible={showAppointment}
            appointmentId={appointmentSelected}
            onOk={this.handleOk}
            onCancel={this.hideAppointment}
            onCancelAppointment={this.handleCancelAppointment}
            cancelLoading={cancelLoading}
          />
        )}

        <Modal
          title={`Crear reservación ${currentSlots && moment(currentSlots[0]).format('MMMM DD, h:mm a')}`}
          // title="Crear reservacion"
          visible={bookingFormVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={submitting} onClick={this.handleOk}>
              { submitting ? 'Creando' : 'Crear' }
            </Button>,
          ]}
        >
          <BookingForm
            wrappedComponentRef={this.saveFormRef}
            services={services}
            specialists={specialists}
            specialistsByService={specialistsByService}
            // {...fields}
            // onChange={this.handleFormChange}
            // slots={currentSlots}
            // visible={bookingFormVisible}
            // onOk={this.handleOk}
            // onCancel={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

AgendaApp.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  specialists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  specialistsByService: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

AgendaApp.defaultProps = {
  events: [],
}

export default AgendaApp
