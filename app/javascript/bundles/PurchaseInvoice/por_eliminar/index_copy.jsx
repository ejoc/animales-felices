import React, { Component } from 'react'
import { Form, Modal } from 'antd'

import withSubscription from '../../../../shared/lib/withSubscription'
import TableList from '../../../../shared/components/TableList'
import SearchItemInput from '../SearchableInput'
import ItemPriceInput from './ItemPriceInput'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 17 },
  },
}

const productColumns = [{
  title: 'Codigo',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Stock',
  dataIndex: 'stock',
  key: 'stock',
}]

const ProductList = withSubscription(
  (api, input, ok, error) => api.getProducts(input, ok, error),
)(TableList)

class SelectProduct extends Component {
  state = {
    // closeTemp: false,
    productListVisible: false,
  }

  handleProductListClose = () => {
    const { onShow } = this.props
    // ocultar el listado del producto para mostrar el formulario
    this.setState({ productListVisible: false }, () => onShow())
  }

  handleProductListShow = () => {
    const { onHide } = this.props
    // ocultar formulario para mostrar el listado del producto
    onHide()
    this.setState({ productListVisible: true })
  }

  handleRowClick = (item) => {
    console.log('item selected asdsad', item)
    const { form, onShow } = this.props
    form.setFieldsValue({
      item: {
        resourceId: item.id,
        inputText: item.name,
      },
      priceAndQuantity: {
        price: item.price,
      },
    })

    this.setState({ productListVisible: false }, () => onShow())
  }

  checkItemId = (rule, value, callback) => {
    if (!value.resourceId) {
      callback('Por favor ingrese el producto')
      return
    }
    callback()
  }

  checkQuantity = (rule, value, callback) => {
    if (!value.quantity) {
      callback('Por favor ingrese la cantidad del producto')
      return
    }
    callback()
  }


  render() {
    const { form, onShow, onHide } = this.props
    const { productListVisible } = this.state
    const { getFieldDecorator } = form
    return (
      <div>
        <Form>
          <FormItem label="Producto id" {...formItemLayout}>
            {getFieldDecorator('item', {
              initialValue: { resourceId: null, inputText: '' },
              rules: [{ validator: this.checkItemId }],
              // rules: [{ required: true, message: 'Por favor ingrese el producto!' }],
            })(
              <SearchItemInput onSearch={this.handleProductListShow} />,
            )}
          </FormItem>

          <FormItem label="Cantidad" {...formItemLayout}>
            {getFieldDecorator('priceAndQuantity', {
              initialValue: { price: null, quantity: null },
              rules: [{ validator: this.checkQuantity }],
            })(
              <ItemPriceInput />,
            )}
          </FormItem>
        </Form>

        <Modal
          title="Buscar productos"
          visible={productListVisible}
          onCancel={this.handleProductListClose}
          // onOk={this.handleItemSelected}
          // onRowClick={this.handleRowClick}
        >
          <ProductList columns={productColumns} onRowClick={this.handleRowClick} />
        </Modal>
      </div>
    )
  }
}

// SelectProduct.propTypes = {

// }

// SelectProduct.defaultProps = {

// }

export default Form.create()(SelectProduct)
