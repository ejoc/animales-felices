import React from 'react'
import Calendar from 'react-big-calendar'
import moment from 'moment'

import Dnd from '../components/Dnd'

// import 'react-big-calendar/lib/css/react-big-calendar.css'

// moment.locale('us', {
//   workingWeekdays: [1,2,3,4,5,6] 
// })

moment.locale('es')
Calendar.setLocalizer(Calendar.momentLocalizer(moment))
// BigCalendar.setLocalizer(BigCalendar.globalizeLocalizer(globalize))

// localizer(globalize)


export default (props) =>
  <div style={{ padding: '10px', height: '600px' }}>
    <Dnd {...props} />
  </div>
