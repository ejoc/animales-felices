import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { getReports } from "../../../api";
import getAvatarColor from "../../Agenda/resourceColors";

class StackedBarChart extends React.PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    const { periodicity } = this.props;

    getReports(
      periodicity,
      data => this.setState({ data }),
      err => console.log(err)
    );
  }

  componentDidUpdate(prevProps) {
    const { periodicity } = this.props;
    if (periodicity !== prevProps.periodicity) {
      getReports(
        periodicity,
        data => this.setState({ data }),
        err => console.log(err)
      );
    }
  }

  render() {
    const { data } = this.state;
    console.log(data)
    const { counter, specialist, specialist_id, ...services } =
      (data && data[0]) || {};
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="specialist" />
        <YAxis
          label={{ value: "# citas", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        {Object.keys(services).map((service, index) => (
          <Bar
            key={service}
            dataKey={service}
            fill={getAvatarColor(index + 1)}
          />
        ))}
      </BarChart>
    );
  }
}

export default StackedBarChart;
