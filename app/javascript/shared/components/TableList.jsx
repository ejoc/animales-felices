import React from 'react'
import {
  Table,
  Input,
  Divider,
  Button,
} from 'antd'
import PropTypes from 'prop-types'

const { Search } = Input
// const { Column } = Table

// <Column
//   title="Codigo"
//   dataIndex="cedula"
//   key="cedula"
// />
// <Column
//   title="Nombre"
//   dataIndex="name"
//   key="name"
// />
// <Column
//   title="Direccion"
//   dataIndex="address"
//   key="address"
// />

const TableList = ({
  onRowClick,
  onSearch,
  data,
  loading,
  columns,
}) => (
  <React.Fragment>
    <Search
      placeholder="Ingrese busqueda"
      disabled={loading}
      onSearch={onSearch}
      // enterButton={<Button icon="search" loading={loading} onClick={onSearch} />}
    />
    <Divider />
    <Table
      dataSource={data}
      columns={columns}
      loading={loading}
      size="small"
      rowKey="id"
      rowClassName={() => 'rowClickable'}
      onRow={row => ({
        onClick: () => onRowClick(row),
      })}
    />

  </React.Fragment>
)

TableList.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

TableList.defaultProps = {
  loading: false,
}

export default TableList
