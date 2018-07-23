import React from 'react'
import PropTypes from 'prop-types'
import Week from 'react-big-calendar/lib/Week'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import localizer from 'react-big-calendar/lib/localizer'

function workWeekRange(date, options) {
  return Week.range(date, options)
    .filter(d => [7, 0].indexOf(d.getDay()) === -1)
}

class WorkWeek extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  }

  static defaultProps = TimeGrid.defaultProps

  render() {
    let { date, ...props } = this.props
    let range = workWeekRange(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

WorkWeek.range = (date, options) => (
  Week.range(date, options).filter(d => [7, 0].indexOf(d.getDay()) === -1)
)

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { formats, culture }) => {
  const [start, ...rest] = workWeekRange(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture,
  )
}

export default WorkWeek
