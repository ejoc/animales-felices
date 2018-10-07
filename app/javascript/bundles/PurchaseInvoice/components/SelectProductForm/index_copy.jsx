import React, { Component } from 'react'
import { Modal, Form } from 'antd'

import SearchableInput from '../SearchableInput'
import searchableInput from '../../../../shared/lib/searchableInput'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 18 },
  },
}

const SearchItemInput = searchableInput(
  (api, input, ok, error) => api.getStockProducts(input, ok, error),
  null,
)(SearchableInput)

const columns = [{
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

class SelectProduct extends Component {
  handleClose = () => {

  }

  render() {
    const {
      title,
      visible,
      onOk,
      onCancel,
      form,
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form>
          <FormItem label="Product" {...formItemLayout}>
            {getFieldDecorator('itemId', {
              rules: [{ required: true, message: 'Por favor ingrese el producto!' }],
            })(
              <SearchItemInput
                title="Hola"
                columns={columns}
              />,
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

// SelectProduct.propTypes = {

// }

// SelectProduct.defaultProps = {

// }

export default Form.create()(SelectProduct)
