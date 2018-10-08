import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

  renderLayout(layout) {
    const { size, onSearch } = this.props
    const { resourceId, inputText } = this.state
    if (layout === 'vertical') {
      return (
        <span>
          <Input
            type="text"
            size={size}
            value={resourceId}
            // onBlur={onBlur}
            onChange={this.handleInputChange}
            style={{ width: '86%', marginRight: '3%' }}
          />
          <Button shape="circle" icon="search" onClick={onSearch} />
          <Input
            disabled
            type="text"
            size={size}
            value={inputText}
            // style={{ width: '58%', marginRight: '3%' }}
          />
        </span>
      )
    }
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

  render() {
    const { layout } = this.props
    return this.renderLayout(layout)
  }
}

SearchableInput.propTypes = {
  layout: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.string,
  value: PropTypes.shape().isRequired,
}

SearchableInput.defaultProps = {
  layout: 'horizontal',
  size: null,
  onChange: () => {},
}

export default SearchableInput
