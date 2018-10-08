import React from 'react'
import { Table, Popconfirm, Icon } from 'antd'

const { Column } = Table

// const itemColumns = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//   }, {
//     title: 'Nombre',
//     dataIndex: 'name',
//     key: 'name',
//   }, {
//     title: 'Cantidad',
//     dataIndex: 'quantity',
//     key: 'quantity',
//   },
//   {
//     title: 'Precio',
//     dataIndex: 'priceUnit',
//     key: 'priceUnit',
//   },
//   {
//     title: 'Total',
//     dataIndex: 'priceTotal',
//     key: 'priceTotal',
//   },
//   {
//     title: 'operation',
//     dataIndex: 'operation',
//     render: (text, record) => {
//       return (
//         <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//           <a href="javascript:;">
//             Delete
//           </a>
//         </Popconfirm>
//       )
//     },
//   },
// ]

export default ({ items, onItemDelete }) => (
  <Table
    dataSource={items}
    size="small"
    rowKey="id"
  >
    <Column
      title="ID"
      dataIndex="id"
      key="id"
    />

    <Column
      title="Nombre"
      dataIndex="name"
      key="name"
    />

    <Column
      title="Cantidad"
      dataIndex="quantity"
      key="quantity"
    />

    <Column
      title="Precio"
      dataIndex="priceUnit"
      // key="priceUnit"
      render={text => (
        <span>
          {`$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>
      )}
    />

    <Column
      title="Total"
      dataIndex="priceTotal"
      render={text => (
        <span>
          {`$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </span>
      )}
    />

    <Column
      title=""
      key="delete"
      render={(text, record) => (
        <Popconfirm title="Seguro que desea eliminar?" onConfirm={() => onItemDelete(record.id)}>
          <a href="javascript:;">
            <Icon type="delete" theme="outlined" />
          </a>
        </Popconfirm>
      )}
    />
  </Table>
)
