import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { getReports } from '../../../api'

class StackedBarChart extends React.PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    const { periodicity } = this.props

    getReports(periodicity, data => this.setState({ data }), err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    const { periodicity } = this.props
    if (periodicity !== prevProps.periodicity) {
      getReports(periodicity, data => this.setState({ data }), err => console.log(err))
    }
  }

  render() {
    const { data } = this.state
    return (
      <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="specialist" />
        <YAxis label={{ value: '# citas', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="cita general" stackId="a" fill="#8884d8" />
        <Bar dataKey="corte de pelo" stackId="a" fill="#82ca9d" />
      </BarChart>
    )
  }
}

export default StackedBarChart
