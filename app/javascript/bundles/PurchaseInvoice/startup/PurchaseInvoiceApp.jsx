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
import PersonModal from '../../../shared/components/PersonModal'
import withSubscription from '../../../shared/lib/withSubscription'
// import TableList from '../../../shared/components/TableList'
import ListItem from '../components/ListItem'
import SelectProductForm from '../components/SelectProductForm'
// import SearchableInput from '../components/SearchableInput'

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

const itemColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Precio',
    dataIndex: 'priceUnit',
    key: 'priceUnit',
  },
  {
    title: 'Total',
    dataIndex: 'priceTotal',
    key: 'priceTotal',
  },
]

const SupplierModal = withSubscription(
  (api, input, ok, error) => api.getSuppliers(input, ok, error),
  null,
)(PersonModal)


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
    currentSupplier: {},
    supplierCodeInput: '',
    products: [],
    modals: {
      showSupplier: false,
      selectProductForm: false,
    },
    // visibleSupplierModal: false,

  }

  handleModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showSupplier: false },
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

  handleItemModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectProductForm: false },
    }))
  }

  handleSupplierInputChange = (e) => {
    const { target } = e
    const { value } = target
    this.setState({
      supplierCodeInput: value,
    })
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

  handleSupplierSelected = (supplier) => {
    const { form } = this.props
    form.setFieldsValue({
      supplierId: supplier.id,
    })

    this.setState(prevState => ({
      currentSupplier: supplier,
      supplierCodeInput: supplier.cedula,
      modals: { ...prevState.modals, showSupplier: false },
    }))
  }

  showModalSupplier = () => {
    // getSupplier()
    this.setState(prevState => ({
      modals: { ...prevState.modals, showSupplier: true },
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
      currentSupplier,
      supplierCodeInput,
    } = this.state

    const { showSupplier, selectProductForm } = modals

    return (
      <div style={{ padding: '50px 160px', height: '700px' }}>
        <Card title="Ingreso de productos">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Proveedor" {...formItemLayout}>
                {getFieldDecorator('supplierId', {
                  rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
                })(
                  <Input hidden />,
                )}
                <Input
                  value={supplierCodeInput}
                  onChange={this.handleSupplierInputChange}
                  placeholder="Codigo"
                  style={{ width: '88%' }}
                  onBlur={this.handleSupplierBlur}
                />
                &nbsp;
                <Button shape="circle" icon="search" onClick={this.showModalSupplier} />
                <Input placeholder="Nombre" value={currentSupplier.name} disabled />
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
                  <Button>
                    Eliminar
                  </Button>
                  &nbsp;
                  <Button onClick={this.showModalItem}>
                    Agregar
                  </Button>
                </span>
              </h3>
            </Col>
            <Col span={24}>
              <Table
                dataSource={products}
                columns={itemColumns}
                size="small"
                rowKey="id"
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

        <SupplierModal
          columns={columns}
          title="Buscar proveedores"
          visible={showSupplier}
          onCancel={this.handleModalCancel}
          onRowClick={this.handleSupplierSelected}
        />

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
