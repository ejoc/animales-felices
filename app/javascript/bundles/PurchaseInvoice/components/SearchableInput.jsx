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
    const inputText = e.target.value
    if (!('value' in this.props)) {
      this.setState({ inputText })
    }
    this.triggerChange({ inputText })
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render() {
    // const { layout } = this.props
    const {
      size,
      onSearch,
      disabled,
      onBlur,
    } = this.props
    const { resourceId, inputText } = this.state
    return (
      <span>
        <Input
          hidden
          size={size}
          value={resourceId}
        />
        <Input
          disabled={disabled}
          type="text"
          size={size}
          value={inputText}
          onChange={this.handleInputChange}
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


// renderLayout(layout) {
//   const { size, onSearch } = this.props
//   const { resourceId, inputText } = this.state
//   if (layout === 'vertical') {
//     return (
//       <span>
//         <Input
//           type="text"
//           size={size}
//           value={resourceId}
//           // onBlur={onBlur}
//           onChange={this.handleInputChange}
//           style={{ width: '86%', marginRight: '3%' }}
//         />
//         <Button shape="circle" icon="search" onClick={onSearch} />
//         <Input
//           disabled
//           type="text"
//           size={size}
//           value={inputText}
//           // style={{ width: '58%', marginRight: '3%' }}
//         />
//       </span>
//     )
//   }
//   return (
//     <span>
//       <Input
//         hidden
//         size={size}
//         value={resourceId}
//       />
//       <Input
//         disabled
//         type="text"
//         size={size}
//         value={inputText}
//         onChange={this.handleInputChange}
//         style={{ width: '58%', marginRight: '3%' }}
//       />
//       <Button shape="circle" icon="search" onClick={onSearch} />
//     </span>
//   )
// }