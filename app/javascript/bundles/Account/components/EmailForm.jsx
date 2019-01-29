import { Button, Col, Form, Input, notification, Row } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { updateEmail } from '../../../api'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class EmailForm extends React.Component {
  state = {
    // isEqual: false,
    currentEmail: this.props.currentEmail,
    submitting: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitting: true })
        // values.passwordConfirmation = values.confirm
        updateEmail(values.email).then(
          response => {
            // form.resetFields()
            notification.success({
              message: 'Cambio de Contraseña',
              description: response.data,
            })
            this.setState({ submitting: false, currentEmail: values.email })
          },
          errors => {
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

  // checkEmail = (rule, value, callback) => {
  //   const { form, currentEmail } = this.props
  //   if (value && value === currentEmail) {
  //     console.log('aaaa')
  //     callback('Las dos contraseñas que ingreso son inconsistentes!')
  //   } else {
  //     console.log('bbbb')
  //     callback()
  //   }
  // }

  render() {
    const { form } = this.props
    const { getFieldDecorator, getFieldsError, getFieldValue } = form
    const { submitting, currentEmail } = this.state

    // const formItemLayout = {
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 24 },
    //   },
    // }

    return (
      <div style={{ paddingBottom: '10px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <FormItem>
                {getFieldDecorator('email', {
                  initialValue: currentEmail,
                  rules: [
                    {
                      type: 'email',
                      message: 'Ingrese su nuevo email valido',
                    },
                    {
                      required: true,
                      message: 'Ingrese el nuevo email!',
                    },
                  ],
                })(
                  <Input
                    // type="password"
                    placeholder="Email"
                  />
                )}
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={16} lg={8} xl={8}>
              <FormItem>
                <Button
                  htmlType="submit"
                  disabled={
                    hasErrors(getFieldsError()) ||
                    currentEmail === getFieldValue('email')
                  }
                  loading={submitting}
                >
                  Cambiar Email
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

EmailForm.propTypes = {
  currentEmail: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
}

export default Form.create()(EmailForm)
