import React from 'react'
import Calendar from 'react-big-calendar'
import moment from 'moment'

import Dnd from '../components/Dnd'

import WorkWeek from '../components/WorkWeek'
import events from './events'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

// moment.locale('us', {
//   workingWeekdays: [1,2,3,4,5,6] 
// })

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

// localizer(globalize)

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

const Basic = () => (
  <div style={{ padding: '10px', height: '600px' }}>
    <Calendar
      events={events}
      views={{month: true, week: WorkWeek, day: true, agenda: true }}
      step={15}
      timeslots={1}
      showMultiDayTimes
      culture="es-Es"
      min={new Date(2017, 10, 0, 8, 0, 0)}
      max={new Date(2017, 10, 0, 18, 0, 0)} 
      defaultDate={new Date(2015, 3, 1)}
      messages={messages}
    />
  </div>
)

// export default Basic

// {
//   allDay?: any,
//   previous?: any,
//   next?: any,
//   today?: any,
//   month?: any,
//   week?: any,
//   day?: any,
//   agenda?: any,
//   date?: any,
//   time?: any,
//   event?: any,
//   showMore?: Function
// }

// {{month: true, week_work: true, day: true, agenda: true }}