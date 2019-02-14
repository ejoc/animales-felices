import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
} from 'antd'
import PropType from 'prop-types'
import React from 'react'
import { createClient, getClientByCode, invoiceCheckIn } from '../../../api'
import InputMask from '../../../shared/components/InputMask'
import InvoiceFooter from '../../../shared/components/InvoiceFooter'
import InvoiceListItem from '../../../shared/components/InvoiceListItem'
import Layout from '../../../shared/components/Layout'
import TableList from '../../../shared/components/SearchableTable'
import withSubscription from '../../../shared/lib/withSubscription'
import { getFieldErrors, IVA, reject } from '../../../utils/utils'
// import SearchableInput from '../../../shared/components/SearchableInput'
import ClientInput from '../components/ClientInput'
import NewClientForm from '../components/NewClientForm'
import SelectItemForm from '../components/SelectItemForm'

const INVOICE_NO_PATTERN = /^\d{3}-\d{3}-\d{9}$/
const INVOICE_NO_CHECKER = new RegExp(INVOICE_NO_PATTERN)

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
    title: 'Dirección',
    dataIndex: 'address',
    key: 'address',
  },
]

const ClientList = withSubscription((api, input, ok, error) =>
  api.getClients(input, ok, error)
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

class InvoiceApp extends React.Component {
  state = {
    items: [],
    loading: false,
    modals: {
      showClients: false,
      newClient: false,
      selectItemForm: false,
    },
  }

  // item handlers
  handleItemSelected = () => {
    const { props } = this.formRef
    const { form } = props
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const { resourceId, price, inputText } = values.item
      const { quantity } = values
      const priceTotal = quantity * price
      const newItem = {
        itemId: resourceId,
        name: inputText,
        quantity,
        priceUnit: price,
        priceTotal,
      }
      this.setState(
        prevState => ({
          items: prevState.items.concat(newItem),
          modals: { ...prevState.modals, selectItemForm: false },
        }),
        () => form.resetFields()
      )
    })
  }

  handleItemDelete = itemId => {
    this.setState(prevState => ({
      items: prevState.items.filter(p => p.itemId !== itemId),
    }))
  }

  handleItemModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectItemForm: false },
    }))
  }

  // Client handlers
  handleClientModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showClients: false },
    }))
  }

  showModalClient = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showClients: true },
    }))
  }

  handleNewClient = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, newClient: true },
    }))
  }

  handleCancelNewClient = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, newClient: false },
    }))
  }

  handleCreateNewClient = () => {
    const newClientForm = this.newClientFormRef.props.form
    newClientForm.validateFields((err, values) => {
      if (err) {
        return
      }
      createClient(
        values,
        data => {
          const { form } = this.props
          form.setFieldsValue({
            client: {
              resourceId: data.id,
              inputText: data.cedula,
            },
            clientName: data.name,
          })
          newClientForm.resetFields()
          this.setState(prevState => ({
            modals: { ...prevState.modals, newClient: false },
          }))
        },
        error => {
          const errorsData = error.response.data
          const fieldErrors = getFieldErrors(errorsData, values)
          newClientForm.setFields(fieldErrors)
        }
      )
    })
  }

  saveNewClientFormRef = formRef => {
    this.newClientFormRef = formRef
  }

  handleClientBlur = e => {
    const { target } = e
    const { value } = target
    // const value = e.target.value

    if (value) {
      getClientByCode(value).then(
        ({ data }) => {
          const client = data || {}
          const { form } = this.props
          form.setFieldsValue({
            client: {
              resourceId: client.id,
              inputText: client.cedula,
            },
            clientName: client.name,
          })
        },
        err => console.error(err)
      )
    }
  }

  handleClientRowClick = client => {
    const { form } = this.props
    form.setFieldsValue({
      client: {
        resourceId: client.id,
        inputText: client.cedula,
      },
      clientName: client.name,
    })

    this.setState(prevState => ({
      modals: { ...prevState.modals, showClients: false },
    }))
  }

  // handle submit
  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props
    const { items } = this.state
    if (items.length < 1) {
      message.error('Debe seleccionar al menos 1 item')
      return
    }
    form.validateFields((err, values) => {
      if (!err) {
        const fields = {
          no: values.no,
          clientId: values.client.resourceId,
          details_attributes: items.map(i => reject(i, ['name'])),
        }
        this.setState({ loading: true })
        invoiceCheckIn(
          fields,
          invoiceId => {
            form.resetFields()
            this.setState(
              {
                items: [],
                loading: false,
              },
              () =>
                Modal.success({
                  title: 'Se ha registrado la factura correctamente!',
                  content: (
                    <p>
                      Para imprimir la factura haga click{' '}
                      <a href={`/invoices/${invoiceId}/print`} target="_blank">
                        aqui
                      </a>
                    </p>
                  ),
                })
            )
          },
          error => {
            console.log(error)
            const errorsData = error.response.data
            const fieldErrors = getFieldErrors(errorsData, values)
            form.setFields(fieldErrors)
            this.setState({ loading: false })
          }
        )
      }
    })
  }

  showModalItem = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, selectItemForm: true },
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

  checkInvoiceNumber = (rule, value, cb) => {
    if (!INVOICE_NO_CHECKER.test(value)) {
      cb('Por favor ingrese un numero de factura valido')
      return
    }
    cb()
  }

  render() {
    const { form, currentUser, ...rest } = this.props
    const { getFieldDecorator } = form
    const { items, modals, loading } = this.state

    const { showClients, selectItemForm, newClient } = modals

    const subTotal = items.reduce((acc, curr) => acc + curr.priceTotal, 0)
    const iva = subTotal * IVA
    const total = subTotal + iva

    return (
      <Layout {...rest} currentUser={currentUser} activeNav="registro-venta">
        <div
          style={{
            padding: '20px 120px',
            minHeight: '100vh',
            backgroundColor: '#F4F4F4',
          }}
        >
          <Card title="Facturar">
            <Form>
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="Factura #" {...formItemLayout}>
                    {getFieldDecorator('no', {
                      initialValue: '',
                      rules: [
                        {
                          validator: this.checkInvoiceNumber,
                          // required: true,
                          // message: 'Por favor ingrese en numero de factura!',
                        },
                      ],
                    })(
                      <InputMask
                        mask="999-999-999999999"
                        placeholder="Numero de factura"
                      />
                    )}
                  </FormItem>
                  <FormItem label="Personal" {...formItemLayout}>
                    {getFieldDecorator('specialistId', {
                      initialValue: currentUser,
                      // rules: [{ required: true, message: 'Por favor ingrese la cedula!' }],
                    })(<Input placeholder={currentUser} disabled />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Cliente" {...formItemLayout}>
                    {getFieldDecorator('client', {
                      initialValue: { resourceId: null, inputText: '' },
                      rules: [{ validator: this.checkResourceId }],
                    })(
                      <ClientInput
                        onSearch={this.showModalClient}
                        onNewClient={this.handleNewClient}
                        onBlur={this.handleClientBlur}
                        layout="vertical"
                      />
                    )}
                  </FormItem>

                  <FormItem label="Nombre" {...formItemLayout}>
                    {getFieldDecorator('clientName')(
                      <Input type="text" disabled />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Divider />

              <Row>
                <Col span={24}>
                  <h3>
                    Items
                    <span style={{ float: 'right', paddingBottom: '8px' }}>
                      <Button onClick={this.showModalItem}>Agregar Item</Button>
                    </span>
                  </h3>
                </Col>
                <Col span={24}>
                  <InvoiceListItem
                    rowKey="itemId"
                    items={items}
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
                  title="Desea grabar factura?"
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
        </div>
        <Modal
          title="Buscar Clientes"
          visible={showClients}
          onCancel={this.handleClientModalCancel}
        >
          <ClientList
            columns={columns}
            onRowClick={this.handleClientRowClick}
          />
        </Modal>

        <Modal
          title="Seleccionar Item"
          // width={400}
          visible={selectItemForm}
          onCancel={this.handleItemModalCancel}
          onOk={this.handleItemSelected}
        >
          <SelectItemForm
            wrappedComponentRef={this.saveFormRef}
            onHide={this.handleItemModalCancel}
            onShow={this.showModalItem}
          />
        </Modal>

        <Modal
          title="Nuevo cliente"
          okText="Crear cliente"
          visible={newClient}
          onCancel={this.handleCancelNewClient}
          onOk={this.handleCreateNewClient}
        >
          <NewClientForm wrappedComponentRef={this.saveNewClientFormRef} />
        </Modal>
      </Layout>
    )
  }
}

InvoiceApp.propTypes = {
  form: PropType.shape().isRequired,
  currentUser: PropType.string.isRequired,
}

export default Form.create()(InvoiceApp)
