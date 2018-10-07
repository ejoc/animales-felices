import React, { Component } from 'react'
import { Input, Button } from 'antd'

class SearchableInput extends Component {
  constructor(props) {
    super(props)

    const { value } = props || {}
    this.state = {
      resourceId: value.resourceId || '',
      inputText: value.inputText || '',
    }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { value } = nextProps
      this.setState(value)
    }
  }

  handleInputChange = (e) => {
    const resourceId = e.target.value
    if (!('value' in this.props)) {
      this.setState({ resourceId })
    }
    this.triggerChange({ resourceId })
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
    const { size, onSearch } = this.props
    // const Modal = this.props.modal
    const { resourceId, inputText } = this.state
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={resourceId}
          // onBlur={onBlur}
          onChange={this.handleInputChange}
          style={{ width: '26%', marginRight: '3%' }}
        />
        <Input
          disabled
          type="text"
          size={size}
          value={inputText}
          style={{ width: '58%', marginRight: '3%' }}
        />
        <Button shape="circle" icon="search" onClick={onSearch} />
      </span>
    )
  }
}

export default SearchableInput
