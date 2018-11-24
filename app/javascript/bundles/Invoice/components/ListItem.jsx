import React from 'react'
import PropTypes from 'prop-types'
import withSubscription from '../../../shared/lib/withSubscription'
import TableList from '../../../shared/components/SearchableTable'

const productsColumns = [
  {
    title: 'Codigo',
    dataIndex: 'itemId',
    key: 'itemId',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
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

const servicesColumns = [
  {
    title: 'Codigo',
    dataIndex: 'itemId',
    key: 'itemId',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Duracion (min)',
    dataIndex: 'durationMin',
    key: 'durationMin',
  },
]

const ProductList = withSubscription((api, input, ok, error) =>
  api.getProducts(input, ok, error)
)(TableList)

const ServiceList = withSubscription((api, input, ok, error) =>
  api.getServices(input, ok, error)
)(TableList)

const ListItem = ({ type, onRowClick }) => {
  if (type === 'product') {
    return (
      <ProductList
        columns={productsColumns}
        onRowClick={onRowClick}
        rowKey="itemId"
      />
    )
  }

  return (
    <ServiceList
      columns={servicesColumns}
      onRowClick={onRowClick}
      rowKey="itemId"
    />
  )
}

ListItem.propTypes = {
  type: PropTypes.string,
  onRowClick: PropTypes.func.isRequired,
}

ListItem.defaultProps = {
  type: 'product',
}

export default ListItem
