import React, { Component } from 'react'
import { Input, Button } from 'antd'
import SeachableModal from '../../../shared/components/PersonModal'

class SearchableInput extends Component {
  constructor(props) {
    super(props)

    const { value } = props || undefined
    this.state = {
      value,
      inputText: '',
      modalVisible: false,
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
    const value = e.target.value
    if (!('value' in this.props)) {
      this.setState({ value })
    }
    this.triggerChange({ value })
  }

  handleRowClick = (item) => {
    console.log('item selected', item)
    const value = item.id
    const newState = {
      value: item.id,
      inputText: item.name, // make dynamic
      modalVisible: false,
    }
    if (!('value' in this.props)) {
      this.setState(newState)
    }

    this.triggerChange(newState)
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props
    if (onChange) {
      console.log('asdasdasdadasd')
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  render() {
    // const { props } = this
    const { size, ...restProps } = this.props
    // const Modal = this.props.modal
    const { value, inputText, modalVisible } = this.state
    return (
      <span>
        <Input
          type="text"
          value={value}
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
        <Button shape="circle" icon="search" onClick={this.showModal} />

        <SeachableModal
          {...restProps}
          visible={modalVisible}
          onCancel={this.hideModal}
          onRowClick={this.handleRowClick}
        />
      </span>
    )
  }
}

export default SearchableInput
