import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Select } from 'antd'

const { Option } = Select

class SearchableInput extends Component {
  constructor(props) {
    super(props)

    const { value } = props || {}
    this.state = {
      resourceId: value.resourceId || '',
      resourceType: value.resourceType || '',
      inputText: value.inputText || '',
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      }
    }
    return null
  }

  handleSelectChange = resourceType => {
    if (!('value' in this.props)) {
      this.setState({ resourceType, resourceId: '', inputText: '' })
    }
    this.triggerChange({ resourceType, resourceId: '', inputText: '' })
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render() {
    // const { layout } = this.props
    const { size, onSearch, disabled, onBlur } = this.props
    const { resourceId, resourceType, inputText } = this.state
    return (
      <span>
        <Input hidden size={size} value={resourceId} />
        <Select value={resourceType} onChange={this.handleSelectChange}>
          <Option value="service">Servicio</Option>
          <Option value="product">Producto</Option>
        </Select>
        <Input
          disabled={disabled}
          placeholder="Search Item"
          type="text"
          size={size}
          value={inputText}
          onBlur={onBlur}
          style={{ width: '86%', marginRight: '3%' }}
        />
        <Button shape="circle" icon="search" onClick={onSearch} />
      </span>
    )
  }
}

SearchableInput.propTypes = {
  disabled: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.shape().isRequired,
}

SearchableInput.defaultProps = {
  disabled: false,
  size: null,
  onChange: () => {},
  onBlur: () => {},
}

export default SearchableInput
