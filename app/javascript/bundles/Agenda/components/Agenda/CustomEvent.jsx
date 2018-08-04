import React from 'react'
import moment from 'moment'
// import { Badge } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut, faUserMd } from '@fortawesome/free-solid-svg-icons'

const CustomEvent = ({ event }) => {
  const icon = event.serviceId === 1
    ? <FontAwesomeIcon icon={faUserMd} />
    : event.serviceId === 2
    ? <FontAwesomeIcon icon={faCut} />
    : null

  return (
    <div style={{ paddingTop: '5px' }}>
      <strong>
        {moment(event.start).format('LT')}
      </strong>
      &nbsp;-&nbsp;
      {event.title}
      <span className="pull-right" style={{ float: 'right', marginRight: '4px' }}>
        {icon}
      </span>
    </div>
  )
}

export default CustomEvent
