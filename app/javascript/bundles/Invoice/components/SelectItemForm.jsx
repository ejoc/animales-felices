import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, InputNumber } from 'antd'

import SearchItemInput from './SearchItemInput'
import ListItem from './ListItem'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 16 },
  },
}

class SelectItem extends Component {
  state = {
    listItemVisible: false,
    // listItemType: 'service'
  }

  handleListItemClose = () => {
    const { onShow } = this.props
    // ocultar el listado del producto para mostrar el formulario
    this.setState({ listItemVisible: false }, () => onShow())
  }

  handleListItemShow = () => {
    const { onHide } = this.props
    // ocultar formulario para mostrar el listado del producto
    onHide()
    this.setState({ listItemVisible: true })
  }

  handleRowClick = item => {
    const { form, onShow } = this.props
    form.setFieldsValue({
      item: {
        resourceId: item.itemId,
        resourceType: item.type,
        inputText: item.name,
        stock: item.stock,
        price: item.price,
      },
    })

    this.setState({ listItemVisible: false }, () => onShow())
  }

  checkItemId = (rule, value, callback) => {
    if (!value.resourceId) {
      callback('Por favor ingrese item')
      return
    }
    callback()
  }

  checkQuantity = (rule, value, callback) => {
    const {
      form: { getFieldValue },
    } = this.props
    const item = getFieldValue('item')
    if (!value) {
      callback('Por favor ingrese la cantidad!')
      return
    }
    if (item.resourceType && item.stock < value) {
      callback('No hay productos suficientes en stock.')
      return
    }
    callback()
  }

  render() {
    const { form } = this.props
    const { listItemVisible } = this.state
    const { getFieldDecorator, getFieldValue } = form
    const initalResourceType = 'service'
    const { resourceType } = getFieldValue('item') || initalResourceType
    return (
      <div>
        <Form>
          <FormItem label="Item" {...formItemLayout}>
            {getFieldDecorator('item', {
              initialValue: {
                resourceId: null,
                inputText: '',
                resourceType: initalResourceType,
                price: '',
              },
              rules: [{ validator: this.checkItemId }],
            })(<SearchItemInput disabled onSearch={this.handleListItemShow} />)}
          </FormItem>

          <FormItem label="Cantidad" {...formItemLayout}>
            {getFieldDecorator('quantity', {
              rules: [
                // { required: true, message: 'Por favor ingrese la cantidad!' },
                { validator: this.checkQuantity },
              ],
              // rules: [{ validator: this.checkQuantity }],
            })(<InputNumber />)}
          </FormItem>
        </Form>

        <Modal
          title="Buscar items"
          visible={listItemVisible}
          onCancel={this.handleListItemClose}
        >
          <ListItem type={resourceType} onRowClick={this.handleRowClick} />
        </Modal>
      </div>
    )
  }
}

SelectItem.propTypes = {
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  form: PropTypes.shape().isRequired,
}

SelectItem.defaultProps = {}

export default Form.create()(SelectItem)
