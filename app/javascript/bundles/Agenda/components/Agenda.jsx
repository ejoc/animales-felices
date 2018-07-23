/* eslint react/prefer-stateless-function: 0 */
// es necesatio que el componente sea fullstate porque se usa el HOC DragDropContext
import React from 'react'
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import WorkWeek from './WorkWeek'

const messages = {
  month: 'Mes',
  work_week: 'Semana',
  week: 'Semana',
  agenda: 'Agenda',
  day: 'Dia',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  showMore: n => `Ver ${n} mas`,
  allDay: 'Todo el dia',
  // date?: any,
  // time?: any,
  // event?: any,
}

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Agenda extends React.Component {
  render() {
    return (
      <DragAndDropCalendar
        selectable
        views={{ month: true, week: WorkWeek, day: true }}
        culture="es-Es"
        // events={events}
        resizable
        defaultView={BigCalendar.Views.WEEK}
        messages={messages}
        step={15}
        timeslots={1}
        min={new Date(2017, 10, 0, 8, 0, 0)}
        max={new Date(2017, 10, 0, 18, 0, 0)}
        {...this.props}
        // eventPropGetter={this.eventStyleGetter}
        // onSelectSlot={this.createBooking}
        // onEventResize={this.resizeEvent}
        // onEventDrop={this.moveEvent}
      />
    )
  }
}

Agenda.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default DragDropContext(HTML5Backend)(Agenda)


// const Agenda = props => (
//   <DragAndDropCalendar
//     selectable
//     views={{ month: true, week: WorkWeek, day: true }}
//     culture="es-Es"
//     // events={events}
//     resizable
//     defaultView={BigCalendar.Views.WEEK}
//     messages={messages}
//     step={15}
//     timeslots={1}
//     min={new Date(2017, 10, 0, 8, 0, 0)}
//     max={new Date(2017, 10, 0, 18, 0, 0)}
//     {...props}
//     // eventPropGetter={this.eventStyleGetter}
//     // onSelectSlot={this.createBooking}
//     // onEventResize={this.resizeEvent}
//     // onEventDrop={this.moveEvent}

//     // defaultDate={new Date(2018, 7, 12)}
//     // onSelectEvent={event => alert(event.title)}
//     // resources={specialists}
//     // resourceIdAccessor="id"
//     // resourceTitleAccessor="name"
//   />
// )
