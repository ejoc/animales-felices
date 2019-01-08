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
  message,
  Popconfirm,
} from 'antd'

import Layout from '../../../shared/components/Layout'
import { getSupplierByCode, registerIncomeProducts } from '../../../api'
import withSubscription from '../../../shared/lib/withSubscription'
import TableList from '../../../shared/components/SearchableTable'
import InvoiceListItem from '../../../shared/components/InvoiceListItem'
import SelectProductForm from '../components/SelectProductForm'
import SearchableInput from '../../../shared/components/SearchableInput'
import InvoiceFooter from '../../../shared/components/InvoiceFooter'

import { IVA, reject } from '../../../utils/utils'

const columns = [
  {
    title: 'Codigo',
    dataIndex: 'cedula',
    key: 'cedula',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const SupplierList = withSubscription((api, input, ok, error) =>
  api.getSuppliers(input, ok, error)
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
    loading: false,
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

      const { quantity, priceUnit } = values
      const priceTotal = quantity * priceUnit
      const newProduct = {
        productId: values.product.resourceId,
        name: values.product.inputText,
        quantity,
        priceUnit,
        priceTotal,
      }
      this.setState(
        prevState => ({
          products: prevState.products.concat(newProduct),
          modals: { ...prevState.modals, selectProductForm: false },
        }),
        () => form.resetFields()
      )
    })
  }

  handleItemDelete = productId => {
    this.setState(prevState => ({
      products: prevState.products.filter(p => p.productId !== productId),
    }))
  }

  handleItemModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectProductForm: false },
    }))
  }

  handleSupplierBlur = e => {
    const { target } = e
    const { value } = target
    // const value = e.target.value

    if (value) {
      getSupplierByCode(value).then(
        ({ data }) => {
          const supplier = data || {}
          const { form } = this.props
          form.setFieldsValue({
            supplier: {
              resourceId: supplier.id,
              inputText: supplier.cedula,
            },
            supplierName: supplier.name,
          })
        },
        err => console.error(err)
      )
    }
  }

  handleSupplierRowClick = supplier => {
    const { form } = this.props
    form.setFieldsValue({
      supplier: {
        resourceId: supplier.id,
        inputText: supplier.cedula,
      },
      supplierName: supplier.name,
    })

    this.setState(prevState => ({
      modals: { ...prevState.modals, showSuppliers: false },
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    const { products } = this.state
    if (products.length < 1) {
      message.error('Debe seleccionar al menos 1 producto')
      return
    }
    form.validateFields((err, values) => {
      if (!err) {
        const fields = {
          supplierId: values.supplier.resourceId,
          details_attributes: products.map(p => reject(p, ['name'])),
        }
        this.setState({ loading: true })
        registerIncomeProducts(
          fields,
          ok => {
            form.resetFields()
            this.setState(
              {
                products: [],
                loading: false,
              },
              () =>
                Modal.success({
                  title:
                    'Se ha registrado el ingresado de productos correctamente!',
                  content: <p>El inventario ha sido actualizado</p>,
                })
            )
          },
          error => console.error(error) || this.setState({ loading: false })
        )
      }
    })
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

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  // Valida el proveedor
  checkResourceId = (rule, value, callback) => {
    if (!value.resourceId) {
      callback('Por favor ingrese el proveedor')
      return
    }
    callback()
  }

  render() {
    const { form, currentUser, ...rest } = this.props
    const { getFieldDecorator } = form
    const { products, modals, loading } = this.state

    const { showSuppliers, selectProductForm } = modals

    const subTotal = products.reduce((acc, curr) => acc + curr.priceTotal, 0)
    const iva = subTotal * IVA
    const total = subTotal + iva

    return (
      <Layout {...rest} currentUser={currentUser} activeNav="ingreso-productos">
        <div style={{ padding: '20px 120px', height: '700px' }}>
          <Card title="Ingreso de productos">
            <Form>
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="Proveedor" {...formItemLayout}>
                    {getFieldDecorator('supplier', {
                      initialValue: { resourceId: null, inputText: '' },
                      rules: [{ validator: this.checkResourceId }],
                    })(
                      <SearchableInput
                        onSearch={this.showModalSupplier}
                        onBlur={this.handleSupplierBlur}
                        layout="vertical"
                      />
                    )}
                  </FormItem>

                  <FormItem label="Nombre" {...formItemLayout}>
                    {getFieldDecorator('supplierName')(
                      <Input type="text" disabled />
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Personal" {...formItemLayout}>
                    {getFieldDecorator('specialistId', {
                      initialValue: currentUser,
                      // rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
                    })(<Input placeholder={currentUser} disabled />)}
                  </FormItem>
                </Col>
              </Row>

              <Divider />

              <Row>
                <Col span={24}>
                  <h3>
                    Productos
                    <span style={{ float: 'right', paddingBottom: '8px' }}>
                      <Button onClick={this.showModalItem}>Agregar</Button>
                    </span>
                  </h3>
                </Col>
                <Col span={24}>
                  <InvoiceListItem
                    items={products}
                    onItemDelete={this.handleItemDelete}
                  />
                </Col>
              </Row>

              <Row>
                <Col offset={18}>
                  <InvoiceFooter
                    subtotal={subTotal.toFixed(2)}
                    total={total.toFixed(2)}
                    iva={iva.toFixed(2)}
                  />
                </Col>
              </Row>
              <div style={{ float: 'right', paddingTop: '30px' }}>
                <Popconfirm
                  title="Desea ingresar productos?"
                  onConfirm={this.handleSubmit}
                  onCancel={() => console.log('cancel')}
                  okText="Si"
                  cancelText="No"
                >
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Grabar
                  </Button>
                </Popconfirm>
              </div>
            </Form>
          </Card>

          <Modal
            title="Buscar proveedores"
            visible={showSuppliers}
            onCancel={this.handleSupplierModalCancel}
          >
            <SupplierList
              columns={columns}
              onRowClick={this.handleSupplierRowClick}
            />
          </Modal>

          <Modal
            title="Seleccionar Producto"
            // width={400}
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
      </Layout>
    )
  }
}

PurchaseInvoiceApp.propTypes = {
  form: PropType.shape().isRequired,
  currentUser: PropType.string.isRequired,
}

export default Form.create()(PurchaseInvoiceApp)
