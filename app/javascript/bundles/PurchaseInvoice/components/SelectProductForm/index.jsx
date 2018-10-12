import React, { Component } from 'react'
import {
  Form,
  Modal,
  Input,
  Button,
  InputNumber,
} from 'antd'

import withSubscription from '../../../../shared/lib/withSubscription'
import TableList from '../../../../shared/components/TableList'
import SearchItemInput from '../SearchableInput'
// import ItemPriceInput from './ItemPriceInput'

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
    // product: null,
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
      product: {
        resourceId: item.id,
        inputText: item.name,
      },
      priceUnit: item.price,
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

  render() {
    const { form } = this.props
    const { productListVisible } = this.state
    const { getFieldDecorator } = form
    // const priceUnit = getFieldValue('priceUnit')
    // const quantity = getFieldValue('quantity')
    // const priceTotal = (priceUnit * quantity)
    return (
      <div>
        <Form>
          {/* <FormItem label="Producto id" {...formItemLayout}>
            {getFieldDecorator('itemId', {
              rules: [{ validator: this.checkItemId }],
              // rules: [{ required: true, message: 'Por favor ingrese el producto!' }],
            })(
              <Input
                hidden
                type="text"
                // onBlur={onBlur}
                style={{ width: '86%', marginRight: '3%' }}
              />,
            )}
            <Button shape="circle" icon="search" onClick={this.handleProductListShow} />
          </FormItem> */}

          <FormItem label="Producto" {...formItemLayout}>
            {getFieldDecorator('product', {
              initialValue: { resourceId: null, inputText: '' },
              rules: [{ validator: this.checkItemId }],
            })(
              <SearchItemInput disabled onSearch={this.handleProductListShow} />,
            )}
          </FormItem>

          <FormItem label="PVP" {...formItemLayout}>
            {getFieldDecorator('priceUnit')(
              <InputNumber
                disabled
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />,
            )}
          </FormItem>

          <FormItem label="Cantidad" {...formItemLayout}>
            {getFieldDecorator('quantity', {
              rules: [{ required: true, message: 'Por favor ingrese la cantidad!' }],
              // rules: [{ validator: this.checkQuantity }],
            })(
              <InputNumber />,
            )}
          </FormItem>
        </Form>

        <Modal
          title="Buscar productos"
          visible={productListVisible}
          onCancel={this.handleProductListClose}
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
