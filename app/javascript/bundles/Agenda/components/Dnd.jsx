import React from 'react'
import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Modal } from 'antd'

import WorkWeek from './WorkWeek'
import BookingForm from './BookingForm'

// import '~react-big-calendar/lib/addons/dragAndDrop/styles.css'

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
    this.state = {
      events: events,
      bookingFormVisible: false,
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  handleOk = (e) => {
    this.setState({
      bookingFormVisible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      bookingFormVisible: false,
    })
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

  render() {
    const { bookingFormVisible, currentSlots } = this.state
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
        { bookingFormVisible && <BookingForm
          slots={currentSlots}
          visible={bookingFormVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />}
      </React.Fragment>
    )
  }
}

export default DragDropContext(HTML5Backend)(Agenda)