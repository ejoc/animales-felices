import React from 'react'
import PropType from 'prop-types'
import {
  Row,
  Col,
  Card,
  Divider,
  Form,
  Input,
  Button,
  Modal,
  Table,
} from 'antd'
import { getSuppliersByCode } from '../../../api'
// import PersonModal from '../../../shared/components/PersonModal'
import withSubscription from '../../../shared/lib/withSubscription'
import TableList from '../../../shared/components/TableList'
import ListItem from '../components/ListItem'
import SelectProductForm from '../components/SelectProductForm'
import SearchableInput from '../components/SearchableInput'

const columns = [{
  title: 'Codigo',
  dataIndex: 'cedula',
  key: 'cedula',
}, {
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}]

const SupplierList = withSubscription(
  (api, input, ok, error) => api.getSuppliers(input, ok, error),
  null,
)(TableList)

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

const FormItem = Form.Item

class PurchaseInvoiceApp extends React.Component {
  state = {
    products: [],
    modals: {
      showSuppliers: false,
      selectProductForm: false,
    },
    // visibleSupplierModal: false,

  }

  handleSupplierModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showSuppliers: false },
    }))
  }

  handleItemSelected = () => {
    const { props } = this.formRef
    const { form } = props
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const { price } = values.priceAndQuantity
      const { quantity } = values.priceAndQuantity
      const newProduct = {
        id: values.item.resourceId,
        name: values.item.inputText,
        quantity,
        priceUnit: price,
        priceTotal: quantity * price,
      }
      this.setState(prevState => ({
        products: prevState.products.concat(newProduct),
        modals: { ...prevState.modals, selectProductForm: false },
      }), () => form.resetFields())
    })
  }

  handleItemDelete = (productId) => {
    console.log(productId, this.state.products)
    this.setState(prevState => ({
      products: prevState.products.filter(p => p.id !== productId),
    }))
  }

  handleItemModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectProductForm: false },
    }))
  }

  handleSupplierBlur = (e) => {
    const { target } = e
    const { value } = target
    // const value = e.target.value

    if (value) {
      getSuppliersByCode(value).then(
        ({ data }) => {
          const supplier = data || {}
          const { form } = this.props
          form.setFieldsValue({
            supplierId: supplier.id,
          })

          this.setState({
            currentSupplier: supplier,
          })
        },
        err => console.error(err),
      )
    }
  }

  handleSupplierRowClick = (supplier) => {
    console.log('item selected asdsad', supplier)
    const { form } = this.props
    form.setFieldsValue({
      supplier: {
        resourceId: supplier.cedula,
        inputText: supplier.name,
      },
    })

    this.setState(prevState => ({
      modals: { ...prevState.modals, showSuppliers: false },
    }))
  }

  showModalSupplier = () => {
    // getSupplier()
    this.setState(prevState => ({
      modals: { ...prevState.modals, showSuppliers: true },
    }))
  }

  showModalItem = () => {
    // getSupplier()
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectProductForm: true },
    }))
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const {
      products,
      modals,
    } = this.state

    const { showSuppliers, selectProductForm } = modals

    return (
      <div style={{ padding: '50px 160px', height: '700px' }}>
        <Card title="Ingreso de productos">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Proveedor" {...formItemLayout}>
                {getFieldDecorator('supplier', {
                  initialValue: { resourceId: null, inputText: '' },
                  rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
                })(
                  <SearchableInput
                    onSearch={this.showModalSupplier}
                    layout="vertical"
                  />,
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="Personal" {...formItemLayout}>
                {getFieldDecorator('specialistId', {
                  rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
                })(
                  <Input placeholder="Codigo" disabled />,
                )}
              </FormItem>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={24}>
              <h3>
                Productos
                <span style={{ float: 'right', paddingBottom: '8px' }}>
                  <Button onClick={this.showModalItem}>
                    Agregar
                  </Button>
                </span>
              </h3>
            </Col>
            <Col span={24}>
              {/* <Table
                dataSource={products}
                columns={itemColumns}
                size="small"
                rowKey="id"
              /> */}
              <ListItem
                items={products}
                onItemDelete={this.handleItemDelete}
              />
            </Col>
          </Row>

          <Row>
            <Col offset={16}>
              <span>
                Subtotal
              </span>
            </Col>
          </Row>
        </Card>

        <Modal
          title="Buscar proveedores"
          visible={showSuppliers}
          onCancel={this.handleSupplierModalCancel}
        >
          <SupplierList columns={columns} onRowClick={this.handleSupplierRowClick} />
        </Modal>

        <Modal
          title="Seleccionar Producto"
          visible={selectProductForm}
          onCancel={this.handleItemModalCancel}
          onOk={this.handleItemSelected}
        >
          <SelectProductForm
            wrappedComponentRef={this.saveFormRef}
            onHide={this.handleItemModalCancel}
            onShow={this.showModalItem}
          />
        </Modal>
      </div>
    )
  }
}

PurchaseInvoiceApp.propTypes = {
  form: PropType.shape().isRequired,
}

export default Form.create()(PurchaseInvoiceApp)
