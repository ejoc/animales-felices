// import React from 'react'
// import { Select } from 'antd'
// import { getClients } from '../../api'


// const Option = Select.Option;

// let currentValue;

// function fetch(value, callback) {
//   currentValue = value

//   function fake() {
//     getClients(value)
//       .then(({ data }) => {
//         if (currentValue === value) {
//           const result = []
//           data.forEach((r) => {
//             result.push({
//               value: r[0],
//               text: r[0],
//             })
//           })
//           callback(data)
//         }
//       })
//   }
// }

// class ClientSelect extends React.Component {
//   state = {
//     data: [],
//     value: '',
//   }

//   handleChange = (value) => {
//     this.setState({ value })
//     fetch(value, data => this.setState({ data }))
//   }

//   render() {
//     const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
//     return (
//       <Select
//         mode="combobox"
//         value={this.state.value}
//         placeholder={this.props.placeholder}
//         style={this.props.style}
//         defaultActiveFirstOption={false}
//         showArrow={false}
//         filterOption={false}
//         onChange={this.handleChange}
//       >
//         {options}
//       </Select>
//     );
//   }
// }

// export default ClientSelect

import React from 'react'
import { getClients } from '../../api'
import AsyncSelect from '../AsyncSelect'

class ClientSelect extends React.Component {
  getValues = (input) => {
    if (!input || input.length < 3) {
      return Promise.resolve([])
    }
    return getClients(input)
      .then(response => response.data)
  }

  render() {
    return (
      <AsyncSelect
        {...this.props}
        // onChange={this.props.onChange}
        loadOptions={this.getValues}
        valueKey="name"
        labelKey="name"
      />
    )
  }
}

export default ClientSelect