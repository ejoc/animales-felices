import React from 'react'
import Layout from '../../../shared/components/Layout'
import Bar from '../components/Bar'
import LineChart from '../components/LineChart'
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
    const { monthly, ...restProps } = this.props
    const { periodicity } = this.state
    return (
      <Layout {...restProps} activeNav="reportes">
        <MenuChart
          periodicity={periodicity}
          onPeriodicityChange={this.handlePeriodicityChange}
        />
        <Bar periodicity={periodicity} />
        <LineChart />
      </Layout>
    )
  }
}

export default ReportApp
