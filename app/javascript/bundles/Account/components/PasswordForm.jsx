import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, notification } from 'antd'

import { updatePassword } from '../../../api'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class PasswordForm extends Component {
  state = {
    confirmDirty: false,
    submitting: false,
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({ confirmDirty: confirmDirty || !!value })
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['passwordConfirmation'], { force: true })
    }
    callback()
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Las dos contraseñas que ingreso son inconsistentes!')
    } else {
      callback()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true })
        // values.passwordConfirmation = values.confirm
        updatePassword(values).then(
          response => {
            form.resetFields()
            notification.success({
              message: 'Cambio de Contraseña',
              description: response.data,
            })
            this.setState({ submitting: false })
          },
          errors => {
            // console.log('error al cambiar la contraseña', errors.response.data)
            form.resetFields()
            const errorsData = errors.response.data
            let fieldErrors
            if (errorsData instanceof Array) {
              fieldErrors = errorsData.map(error => {
                const fieldError = Object.keys(error)[0]
                return {
                  [fieldError]: {
                    value: values[fieldError],
                    errors: error[fieldError].map(er => new Error(er)),
                  },
                }
              })
            } else {
              const fieldError = Object.keys(errorsData)[0]
              fieldErrors = {
                [fieldError]: {
                  value: values[fieldError],
                  errors: errorsData[fieldError].map(er => new Error(er)),
                },
              }
            }
            form.setFields(fieldErrors)
            this.setState({ submitting: false })
          }
        )
      }
    })
  }

  render() {
    const { minimumPasswordLength, form } = this.props
    const { getFieldDecorator, getFieldsError } = form
    const { submitting } = this.state

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('currentPassword', {
            rules: [
              { required: true, message: 'Porfavor digite contraseña actual!' },
            ],
          })(<Input type="password" placeholder="Digite contraseña actual" />)}
        </FormItem>

        <FormItem
          // label="Nueva contraseña"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Porfavor digite la nueva contraseña!',
              },
              {
                min: minimumPasswordLength,
                message: `Contraseña debe tener ${minimumPasswordLength} o más carateres.`,
              },
              { validator: this.checkConfirm },
            ],
          })(
            <Input
              type="password"
              placeholder="Digite la nueva contraseña"
              min={minimumPasswordLength}
            />
          )}
        </FormItem>

        <FormItem
          // label="Confirma la nueva contraseña"
          hasFeedback
        >
          {getFieldDecorator('passwordConfirmation', {
            rules: [
              {
                required: true,
                message: 'Porfavor digite la nueva contraseña!',
              },
              {
                validator: this.checkPassword,
              },
            ],
          })(
            <Input
              type="password"
              onBlur={this.handleConfirmBlur}
              placeholder="Digite la nueva contraseña de nuevo"
            />
          )}
        </FormItem>

        <FormItem style={{ textAlign: 'center' }}>
          <Button
            // type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={submitting}
          >
            Actualizar contraseña
          </Button>
        </FormItem>
      </Form>
    )
  }
}

PasswordForm.propTypes = {
  minimumPasswordLength: PropTypes.number,
  form: PropTypes.shape().isRequired,
}

PasswordForm.defaultProps = {
  minimumPasswordLength: 6,
}

export default Form.create()(PasswordForm)
