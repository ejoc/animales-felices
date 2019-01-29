import { Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import ReactInputMask from 'react-input-mask'

const InputMask = props => {
  return (
    <ReactInputMask {...props}>
      {inputProps => (
        <Input
          {...inputProps}
          disabled={props.disabled ? props.disabled : null}
        />
      )}
    </ReactInputMask>
  )
}

InputMask.propTypes = {
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  formatChars: PropTypes.object,
  alwaysShowMask: PropTypes.bool,
  inputRef: PropTypes.func,
}

export default InputMask
