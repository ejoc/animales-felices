import React from 'react'
import { Col, Row } from 'antd'
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
      <Layout {...restProps} activeNav="statistical-reports">
        <div style={{ padding: '15px' }}>
          <Row>
            <Col span={24}>
              <LineChart />
            </Col>
            <Col span={24}>
              <div style={{ width: 600 }}>
                <MenuChart
                  periodicity={periodicity}
                  onPeriodicityChange={this.handlePeriodicityChange}
                />
                <Bar periodicity={periodicity} />
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

export default ReportApp
