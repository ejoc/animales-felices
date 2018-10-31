import React from 'react'
import Bar from '../components/Bar'
import MenuChart from '../components/MenuChart'

class ReportApp extends React.Component {
  state = {
    periodicity: 'month',
    reportData: [],
  }

  handlePeriodicityChange = e => {
    this.setState({ periodicity: e.key })
  }

  render() {
    const { monthly } = this.props
    const { periodicity } = this.state
    return (
      <div>
        <MenuChart periodicity={periodicity} onPeriodicityChange={this.handlePeriodicityChange} />
        <Bar periodicity={periodicity} data={monthly} />
      </div>
    )
  }
}

export default ReportApp
