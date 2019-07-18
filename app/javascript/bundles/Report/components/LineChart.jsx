import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { getServiceReport } from "../../../api";
import getAvatarColor from "../../Agenda/resourceColors";

class LineChartService extends React.PureComponent {
  state = {
    data: [],
    services: []
  };

  componentDidMount() {
    getServiceReport(
      data => {
        // get services
        const services = data.reduce((prev, curr) => {
          const { yyyymm, ...rest } = curr;
          const keys = Object.keys(rest);
          return [...new Set([...prev, ...keys])];
        }, []);
        this.setState({ data, services });
      },
      err => console.log(err)
    );
  }

  render() {
    const { data, services } = this.state;
    return (
      <LineChart
        width={1200}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="yyyymm" />
        <YAxis
          label={{
            value: "Ventas/Servicio",
            angle: -90,
            position: "insideLeft"
          }}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={v => `$ ${v}`} />
        <Legend />
        {services.map((service, index) => (
          <Line
            key={service}
            type="monotone"
            dataKey={service}
            stroke={getAvatarColor(index + 1)}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    );
  }
}

export default LineChartService;
