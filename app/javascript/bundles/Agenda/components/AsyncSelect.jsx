import React from 'react'
import { Select, Spin } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

class AsyncSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultOptions: Array.isArray(props.defaultOptions)
        ? props.defaultOptions
        : undefined,
      inputValue: '',
      isFetching: props.defaultOptions === true,
      loadedOptions: [],
      loadedInputValue: undefined,
      passEmptyOptions: false,
    }

    this.mounted = false
    this.optionsCache = {}
    this.lastRequest = {}
  }

  componentDidMount() {
    this.mounted = true
    const { defaultOptions } = this.props
    if (defaultOptions === true) {
      this.loadOptions('', (options) => {
        if (!this.mounted) return
        const isFetching = !!this.lastRequest
        this.setState({ defaultOptions: options || [], isFetching })
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // if the cacheOptions prop changes, clear the cache
    if (nextProps.cacheOptions !== this.props.cacheOptions) {
      this.optionsCache = {}
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  // eslint-disable-next-line consistent-return
  loadOptions(inputValue, callback) {
    const { loadOptions } = this.props
    if (!loadOptions) return callback()
    const loader = loadOptions(inputValue, callback)
    if (loader && typeof loader.then === 'function') {
      loader.then(callback, () => callback())
    }
  }

  handleInputChange = (inputValue) => {
    const { cacheOptions } = this.props

    if (!inputValue) {
      delete this.lastRequest
      this.setState({
        inputValue: '',
        loadedInputValue: '',
        loadedOptions: [],
        isFetching: false,
        passEmptyOptions: false,
      })
      return
    }
    const optionsCache = this.optionsCache[inputValue]
    if (cacheOptions && optionsCache) {
      this.setState({
        inputValue,
        loadedInputValue: inputValue,
        loadedOptions: optionsCache,
        isFetching: false,
        passEmptyOptions: false,
      })
    } else {
      // eslint-disable-next-line no-multi-assign
      const request = (this.lastRequest = {})
      this.setState(
        {
          inputValue,
          loadedOptions: [],
          isFetching: true,
          passEmptyOptions: !this.state.loadedInputValue,
        },
        () => {
          this.loadOptions(inputValue, (options) => {
            if (!this.mounted) return
            if (options) {
              this.optionsCache[inputValue] = options
            }
            if (request !== this.lastRequest) return
            delete this.lastRequest
            this.setState({
              isFetching: false,
              loadedInputValue: inputValue,
              loadedOptions: options || [],
              passEmptyOptions: false,
            })
          })
        },
      )
    }
    // return inputValue
  }

  render() {
    const {
      loadOptions,
      valueKey,
      labelKey,
      ...props
    } = this.props

    const {
      defaultOptions,
      inputValue,
      isFetching,
      loadedInputValue,
      loadedOptions,
      passEmptyOptions,
    } = this.state

    // eslint-disable-next-line no-nested-ternary
    const options = passEmptyOptions
      ? []
      : inputValue && loadedInputValue ? loadedOptions : defaultOptions || []

    return (
      <Select
        // labelInValue
        {...props}
        // onInputKeyDown={e => e.key === 'Enter' && e.preventDefault()}
        mode="combobox"
        // value={inputValue}
        placeholder={this.props.placeholder}
        optionLabelProp="children"
        defaultActiveFirstOption={false}
        notFoundContent={isFetching ? <Spin size="small" /> : null}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleInputChange}
      >
        {options.map(d => <Option key={d[valueKey]}>{d[labelKey]}</Option>)}
      </Select>
    )
  }
}

AsyncSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  style: PropTypes.shape(),
  // defaultOptions: PropTypes.arrayOf(PropTypes.shape()),
  defaultOptions: PropTypes.any,
  cacheOptions: PropTypes.any,
  placeholder: PropTypes.string,
  // mode: PropTypes.oneOf(['simple', 'multiple']),
}

AsyncSelect.defaultProps = {
  style: {},
  valueKey: 'value',
  labelKey: 'label',
  onChange: () => {},
  loadOptions: () => {},
  defaultOptions: false,
  cacheOptions: true,
  placeholder: 'input search text',
  // mode: 'simple',
}

export default AsyncSelect
