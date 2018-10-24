import React, { Component } from 'react'
import { Form, Modal, InputNumber } from 'antd'

import withSubscription from '../../../../shared/lib/withSubscription'
import TableList from '../../../../shared/components/SearchableTable'
import SearchItemInput from '../../../../shared/components/SearchableInput'

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

const productColumns = [
  {
    title: 'Codigo',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tipo de unidad',
    dataIndex: 'unitType',
    key: 'unitType',
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
  },
]

const ProductList = withSubscription((api, input, ok, error) =>
  api.getProducts(input, ok, error)
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

  handleRowClick = item => {
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
    return (
      <div>
        <Form>
          <FormItem label="Producto" {...formItemLayout}>
            {getFieldDecorator('product', {
              initialValue: { resourceId: null, inputText: '' },
              rules: [{ validator: this.checkItemId }],
            })(
              <SearchItemInput disabled onSearch={this.handleProductListShow} />
            )}
          </FormItem>

          <FormItem label="PVP" {...formItemLayout}>
            {getFieldDecorator('priceUnit')(
              <InputNumber
                disabled
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            )}
          </FormItem>

          <FormItem label="Cantidad" {...formItemLayout}>
            {getFieldDecorator('quantity', {
              rules: [
                { required: true, message: 'Por favor ingrese la cantidad!' },
              ],
              // rules: [{ validator: this.checkQuantity }],
            })(<InputNumber />)}
          </FormItem>
        </Form>

        <Modal
          title="Buscar productos"
          visible={productListVisible}
          onCancel={this.handleProductListClose}
        >
          <ProductList
            columns={productColumns}
            onRowClick={this.handleRowClick}
          />
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
