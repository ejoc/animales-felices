import React, { Component } from 'react'
import { InputNumber } from 'antd'

class InputPriceInput extends Component {
  constructor(props) {
    super(props)

    const { value } = props || {}
    this.state = {
      price: value.price || null,
      quantity: value.quantity || null,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { value } = nextProps
      this.setState(value)
    }
  }

  handleInputChange = (quantity) => {
    // const quantity = value
    if (!('value' in this.props)) {
      this.setState({ quantity })
    }
    this.triggerChange({ quantity })
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render() {
    // const { props } = this
    const { size } = this.props
    // const Modal = this.props.modal
    const { price, quantity } = this.state
    return (
      <span>
        <InputNumber
          size={size}
          value={quantity}
          min={0.001}
          // onBlur={onBlur}
          onChange={this.handleInputChange}
          style={{ width: '26%', marginRight: '3%' }}
        />
        PVP:&nbsp;
        <InputNumber
          disabled
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          size={size}
          value={price}
          style={{ width: '47%' }}
        />
      </span>
    )
  }
}

export default InputPriceInput
