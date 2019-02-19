import moment from 'moment'
import React from 'react'

const CustomEvent = ({ event }) => {
  // const icon = event.serviceId === 1
  //   ? <FontAwesomeIcon icon={faUserMd} />
  //   : event.serviceId === 2
  //   ? <FontAwesomeIcon icon={faCut} />
  //   : null

  return (
    <div style={{ paddingTop: '5px' }}>
      <strong>{moment(event.startTime).format('LT')}</strong>
      &nbsp;-&nbsp;
      {event.clientName}
      {/* <span className="pull-right" style={{ float: 'right', marginRight: '4px' }}>
        {icon}
      </span> */}
    </div>
  )
}

export default CustomEvent
