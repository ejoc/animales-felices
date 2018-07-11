import React from 'react'
// import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Modal, notification } from 'antd'
import moment from 'moment'

import WorkWeek from './WorkWeek'
import BookingForm from './BookingForm'
import { bookingAppoiment } from '../api'

// import '~react-big-calendar/lib/addons/dragAndDrop/styles.css'

// const events = []
const messages = {
  month: 'Mes',
  work_week: 'Semana',
  week: 'Semana',
  agenda: 'Agenda',
  day: 'Dia',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  showMore: (n) => `Ver ${n} mas`,
  allDay: 'Todo el dia',
  // date?: any,
  // time?: any,
  // event?: any,
}

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Agenda extends React.Component {
  constructor(props) {
    super(props)
    const events = this.props.events.map(event => ({ ...event, start: new Date(event.start), end: new Date(event.end) }))
    console.log(events)
    this.state = {
      events,
      bookingFormVisible: false,
      submitting: false,
      fields: {
        service: { value: '', duration_min: '' },
        specialist: { value: '' },
        clientFields: {
          name: '',
          email: '',
          phone: '',
        }
      }
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was dropped onto ${event.start}`)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was resized to ${start}-${end}`)
  }

  createBooking = (slotInfo) => {
    // alert(
    //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //     `\nend: ${slotInfo.end.toLocaleString()}` +
    //     `\naction: ${slotInfo.action}`
    // )

    console.log(slotInfo)

    this.setState({
      bookingFormVisible: true,
      currentSlots: slotInfo.slots,
      // currentSlotInfo: slotInfo,
    })
  }

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  handleOk = (e) => {
    // bookingAppoiment
    e.preventDefault();
    const form = this.formRef.props.form
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
        bookingAppoiment(fields).then(
          (response) => {
            form.resetFields()
            notification.success({
              message: 'Reservación creada exitosamente!',
              description: response.data,
            })
            this.setState({ submitting: false, bookingFormVisible: false })
          },
          (errors) => {
            // console.log('error al cambiar la contraseña', errors.response.data)
            form.resetFields()
            const errorsData = errors.response.data
            let fieldErrors;
            if(errorsData instanceof Array) {
              fieldErrors = errorsData.map(error => {
                fieldError = Object.keys(error)[0]
                return {
                  [fieldError]: {
                    value: values[fieldError],
                    errors: error[fieldError].map(e => new Error(e))
                  }
                }
              })
            } else {
              const fieldError = Object.keys(errorsData)[0]
              fieldErrors = {
                [fieldError]: {
                  value: values[fieldError],
                  errors: errorsData[fieldError].map(e => new Error(e))
                }
              }
            }
            form.setFields(fieldErrors)
            this.setState({ submitting: false })
          }
        )
      }
    })
  }

  handleCancel = (e) => {
    const form = this.formRef.props.form
    this.setState({
      bookingFormVisible: false,
    })
    form.resetFields()
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const { bookingFormVisible, currentSlots, fields } = this.state
    return (
      <React.Fragment>
        <DragAndDropCalendar
          selectable
          views={{ month: true, week: WorkWeek, day: true }}
          culture="es-Es"
          events={this.state.events}
          onEventDrop={this.moveEvent}
          resizable
          onEventResize={this.resizeEvent}
          defaultView={BigCalendar.Views.WEEK}
          messages={messages}
          step={15}
          // timeslots={1}
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 18, 0, 0)} 
          defaultDate={new Date(2015, 3, 12)}
          // onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.createBooking}
        />
        <span>{JSON.stringify(this.state.events)}</span>
        { bookingFormVisible &&
          <Modal
            title={`Crear reservación ${moment(currentSlots[0]).format('MMMM d, h:mm a')}`}
            // title="Crear reservacion"
            visible={bookingFormVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <BookingForm
              wrappedComponentRef={this.saveFormRef}
              {...fields}
              onChange={this.handleFormChange}
              // slots={currentSlots}
              // visible={bookingFormVisible}
              // onOk={this.handleOk}
              // onCancel={this.handleCancel}
              {...this.props}
            />
          </Modal>
        }
      </React.Fragment>
    )
  }
}

export default DragDropContext(HTML5Backend)(Agenda)