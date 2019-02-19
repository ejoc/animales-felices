import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
// import { getClients } from '../../../../api'
// import ClientSelect from './ClientSelect'
// import AsyncSelect from '../AsyncSelect'

class ClientInput extends React.Component {
  constructor(props) {
    super(props)
    const value = props.value || {}
    this.state = {
      name: value.name || '',
      phone: value.phone || '',
      email: value.email || '',
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      }
    }
    return null
  }

  // componentWillReceiveProps(nextProps) {
  //   // Should be a controlled component.
  //   if ('value' in nextProps) {
  //     const { value } = nextProps
  //     this.setState(value)
  //   }
  // }

  // getValues = input => {
  //   if (!input || input.length < 3) {
  //     return Promise.resolve([])
  //   }
  //   return getClients(input).then(response => response.data)
  // }

  handleInputChange = e => {
    const { name, value } = e.target
    const input = { [name]: value }
    if (!('value' in this.props)) {
      this.setState(input)
    }
    this.triggerChange(input)
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render() {
    const { name, email, phone } = this.state

    return (
      <React.Fragment>
        {/* <AsyncSelect
          placeholder="Nombre"
          value={name}
          onChange={this.handleNameChange}
          loadOptions={this.getValues}
          valueKey="name"
          labelKey="name"
        /> */}

        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Nombre"
          onChange={this.handleInputChange}
        />

        <Input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleInputChange}
        />

        <Input
          type="text"
          name="phone"
          placeholder="Telefono"
          value={phone}
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    )
  }
}

ClientInput.propTypes = {
  onChange: PropTypes.func,
}

ClientInput.defaultProps = {
  onChange: () => {},
}

export default ClientInput
