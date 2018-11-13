import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { getServiceReport } from '../../../api'

class LineChartService extends React.PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    getServiceReport(data => this.setState({ data }), err => console.log(err))
  }

  render() {
    const { data } = this.state
    console.log('data ss', data)
    return (
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="yyyymm" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Cita General"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Corte de pelo" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

export default LineChartService
