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
} from 'antd'

import Layout from '../../../shared/components/Layout'
import { getClientByCode, invoiceCheckIn } from '../../../api'
import withSubscription from '../../../shared/lib/withSubscription'
import TableList from '../../../shared/components/SearchableTable'
import InvoiceListItem from '../../../shared/components/InvoiceListItem'
import SearchableInput from '../../../shared/components/SearchableInput'
import InvoiceFooter from '../../../shared/components/InvoiceFooter'
import SelectItemForm from '../components/SelectItemForm'

import { IVA } from '../../../utils/utils'

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

class PurchaseInvoiceApp extends React.Component {
  state = {
    items: [],
    modals: {
      showClients: false,
      selectItemForm: false,
    },
  }

  handleClientModalCancel = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showClients: false },
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
      const newItem = {
        itemId: values.item.resourceId,
        name: values.item.inputText,
        quantity,
        priceUnit,
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
          clientId: values.client.resourceId,
          details_attributes: items,
        }
        invoiceCheckIn(
          fields,
          ok => {
            form.resetFields()
            this.setState(
              {
                items: [],
              },
              () =>
                message.success(
                  'Se ha registrado el ingresado de productos correctamente!'
                )
            )
          },
          error => console.error(error)
        )
      }
    })
  }

  showModalClient = () => {
    this.setState(prevState => ({
      modals: { ...prevState.modals, showClients: true },
    }))
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

  render() {
    const { form, currentUser, ...rest } = this.props
    const { getFieldDecorator } = form
    const { items, modals } = this.state

    const { showClients, selectItemForm } = modals

    const subTotal = items.reduce((acc, curr) => acc + curr.priceTotal, 0)
    const iva = subTotal * IVA
    const total = subTotal + iva

    return (
      <Layout {...rest} currentUser={currentUser} activeNav="registro-venta">
        <div style={{ padding: '20px 120px', height: '700px' }}>
          <Card title="Facturar">
            <Form onSubmit={this.handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormItem label="Cliente" {...formItemLayout}>
                    {getFieldDecorator('client', {
                      initialValue: { resourceId: null, inputText: '' },
                      rules: [{ validator: this.checkResourceId }],
                    })(
                      <SearchableInput
                        onSearch={this.showModalClient}
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
                <Button type="primary" htmlType="submit">
                  Grabar
                </Button>
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
      </Layout>
    )
  }
}

PurchaseInvoiceApp.propTypes = {
  form: PropType.shape().isRequired,
  currentUser: PropType.string.isRequired,
}

export default Form.create()(PurchaseInvoiceApp)
