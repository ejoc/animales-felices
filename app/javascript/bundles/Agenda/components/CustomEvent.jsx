import React from 'react'
import moment from 'moment'
import { Badge } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut, faUserMd } from '@fortawesome/free-solid-svg-icons'

const CustomEvent = ({ event }) => {
  return (
    <div>
      <strong>
        {moment(event.start).format('LT')}
      </strong>
      &nbsp;- {event.title}
      <span className="pull-right">
        <FontAwesomeIcon icon={faUserMd} />
      </span>
    </div>
  )
}

export default CustomEvent
