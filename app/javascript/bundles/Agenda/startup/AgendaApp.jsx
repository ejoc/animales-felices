import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Row,
  Modal,
  notification,
  Button,
} from 'antd'
import Calendar from 'react-big-calendar'
import moment from 'moment'

import BookingForm from '../components/BookingForm'
import SpecialistFilterPanel from '../components/SpecialistFilterPanel'
import ServiceFilterPanel from '../components/ServiceFilterPanel'
import Agenda from '../components/Agenda'
import getAvatarColor from '../resourceColors'
import { bookingAppointment, cancelAppointment } from '../api'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
import ShowEvent from '../components/ShowEvent'

moment.locale('es')
Calendar.setLocalizer(Calendar.momentLocalizer(moment))
// BigCalendar.setLocalizer(BigCalendar.globalizeLocalizer(globalize))

// localizer(globalize)

class AgendaApp extends Component {
  constructor(props) {
    super(props)
    const { events } = this.props
    // const resources = specialists
    const allEvents = events
      .map(event => ({
        id: event.id,
        ...event.attributes,
        // resourceId: event.resource_id,
        start: new Date(event.attributes.start),
        end: new Date(event.attributes.end),
      }))
    this.state = {
      events: allEvents,
      bookingFormVisible: false,
      showAppointment: false,
      submitting: false,
      // filtersBySpecialist: null,
      // filtersByService: null,
    }
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
            const { events } = this.state
            const event = {
              ...data,
              start: new Date(data.start),
              end: new Date(data.end),
            }
            this.setState({
              submitting: false,
              bookingFormVisible: false,
              events: events.concat(event),
            })
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

  handleShowAppointment = () => {
    this.setState({
      showAppointment: false,
    })
  }

  /*
  * Specialist Filter
  */
  handleSpecialistClick = ({ key }) => {
    this.setState({
      filtersBySpecialist: key,
    })
  }

  viewAllSpecialists = (e) => {
    e.preventDefault()
    this.setState({
      filtersBySpecialist: null,
    })
  }

  /*
  * Service Filter
  */
  handleServiceClick = ({ key }) => {
    this.setState({
      filtersByService: key,
    })
  }

  viewAllServices = (e) => {
    e.preventDefault()
    this.setState({
      filtersByService: null,
    })
  }

  /*
  * Agenda
  */
  createBooking = (slotInfo) => {
    // alert(
    //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //     `\nend: ${slotInfo.end.toLocaleString()}` +
    //     `\naction: ${slotInfo.action}`
    // )

    this.setState({
      bookingFormVisible: true,
      currentSlots: slotInfo.slots,
      // currentSlotInfo: slotInfo,
    })
  }

  // eventStyleGetter = (event, start, end, isSelected) => {
  eventStyleGetter = (event) => {
    // const backgroundColor = '#' + event.resourceId
    const backgroundColor = getAvatarColor(event.resourceId)
    const style = {
      backgroundColor,
      // borderRadius: '0px',
      // opacity: 0.8,
      // color: 'black',
      border: '1px solid #595959',
      display: 'block',
      // left: '0%',
      // width: '100%',
    }
    return {
      style,
    }
  }

  selectEvent = (event) => {
    this.setState({
      showAppointment: true,
      appointmentSelected: event.id,
    })
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
    } = this.state
    const { services, specialists, specialistsByService } = this.props
    let showEvents = filtersBySpecialist
      ? events.filter(event => event.resourceId === Number(filtersBySpecialist))
      : events

    showEvents = filtersByService
      ? showEvents.filter(event => event.serviceId === Number(filtersByService))
      : showEvents
    return (
      <div style={{ padding: '10px', height: '700px' }}>
        <Row gutter={8}>
          <Col span={4}>
            <SpecialistFilterPanel
              handleSpecialistClick={this.handleSpecialistClick}
              filtersBySpecialist={filtersBySpecialist}
              specialists={specialists}
              viewAllSpecialists={this.viewAllSpecialists}
            />

            <ServiceFilterPanel
              handleServiceClick={this.handleServiceClick}
              filtersByService={filtersByService}
              services={services}
              viewAllServices={this.viewAllServices}
            />
          </Col>
          <Col span={20} style={{ height: '600px' }}>
            <Agenda
              events={showEvents}
              // onEventDrop={this.moveEvent}
              // onEventResize={this.resizeEvent}
              // slotPropGetter={() => {}}
              // scrollToTime={new Date()}
              eventPropGetter={this.eventStyleGetter}
              onSelectSlot={this.createBooking}
              onSelectEvent={this.selectEvent}
              // {...this.props}
            />
          </Col>
        </Row>

        {showAppointment && (
          <ShowEvent
            visible={showAppointment}
            appointmentId={appointmentSelected}
            onOk={this.handleOk}
            onCancel={this.handleShowAppointment}
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
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  specialistsByService: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default AgendaApp


// resizeEvent = (resizeType, { event, start, end }) => {
//   const { events } = this.state

//   const nextEvents = events.map(existingEvent => (existingEvent.id === event.id
//     ? { ...existingEvent, start, end }
//     : existingEvent
//   ))

//   this.setState({
//     events: nextEvents,
//   })

//   console.log(`${event.title} was resized to ${start}-${end}`)
// }

// moveEvent = ({ event, start, end }) => {
//   const { events } = this.state

//   const idx = events.indexOf(event)
//   const updatedEvent = { ...event, start, end }

//   const nextEvents = [...events]
//   nextEvents.splice(idx, 1, updatedEvent)

//   this.setState({
//     events: nextEvents,
//   })

//   console.log(`${event.title} was dropped onto ${event.start}`)
// }
