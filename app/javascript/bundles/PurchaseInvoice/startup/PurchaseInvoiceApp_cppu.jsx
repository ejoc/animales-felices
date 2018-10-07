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
} from 'antd'
import { getSuppliersByCode } from '../../../api'
import PersonModal from '../../../shared/components/PersonModal'
import withPersonModal from '../../../shared/lib/withPersonModal'
import ListItem from '../components/ListItem'
import SelectProductModal from '../components/SelectProduct'

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

const SupplierModal = withPersonModal(
  PersonModal,
  (api, input, ok, error) => api.getSuppliers(input, ok, error),
)


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
      selectProduct: false,
    },
    // visibleSupplierModal: false,

  }

  handleModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showSupplier: false },
    }))
  }

  handleItemSelected = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState(prevState => ({
        modals: { ...prevState.modals, selectProduct: false },
      }))
    })
  }

  handleItemModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectProduct: false },
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
      modals: { ...prevState.modals, selectProduct: true },
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

    const { showSupplier, selectProduct } = modals

    // const supplierButton = (
    //   <Icon style={{}} type="search" theme="outlined" onClick={() => console.log('asdasd')} />
    // )
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
              <ListItem items={products} />
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

        <SelectProductModal
          wrappedComponentRef={this.saveFormRef}
          title="Buscar productos"
          visible={selectProduct}
          onCancel={this.handleItemModalCancel}
          onOk={this.handleItemSelected}
        />
      </div>
    )
  }
}

PurchaseInvoiceApp.propTypes = {
  form: PropType.shape().isRequired,
}

export default Form.create()(PurchaseInvoiceApp)
