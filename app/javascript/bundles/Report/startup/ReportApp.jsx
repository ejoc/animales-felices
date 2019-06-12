import { Card, Col, Divider, Row } from "antd";
import React from "react";
import Layout from "../../../shared/components/Layout";
import Bar from "../components/Bar";
import LineChart from "../components/LineChart";
import MenuChart from "../components/MenuChart";

class ReportApp extends React.Component {
  state = {
    periodicity: "year",
    reportData: []
  };

  handlePeriodicityChange = e => {
    this.setState({ periodicity: e.key });
  };

  render() {
    const { monthly, ...restProps } = this.props;
    const { periodicity } = this.state;
    return (
      <Layout {...restProps} activeNav="statistical-reports">
        <div
          style={{
            padding: "15px",
            minHeight: "100vh",
            backgroundColor: "#F4F4F4"
          }}
        >
          <Row>
            <Col span={24}>
              <Card title="Cantidad de citas agendadas por servicios">
                <LineChart />
              </Card>
            </Col>
            <Divider />
            <Col span={24}>
              <Card title="Participacion del personal">
                <div style={{ width: 600 }}>
                  <MenuChart
                    periodicity={periodicity}
                    onPeriodicityChange={this.handlePeriodicityChange}
                  />
                  <Bar periodicity={periodicity} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

export default ReportApp;
