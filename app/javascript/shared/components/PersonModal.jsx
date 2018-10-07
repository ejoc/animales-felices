import React from 'react'
import {
  Modal,
  Table,
  Input,
  Button,
  Divider,
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

const PersonModal = ({
  title,
  visible,
  onOk,
  onCancel,
  onRowClick,
  onSearch,
  data,
  loading,
  columns,
}) => (
  <Modal
    width={600}
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>
        Cancelar
      </Button>,
    ]}
  >
    <Search placeholder="Ingrese busqueda" onSearch={onSearch} />
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

  </Modal>
)

PersonModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

PersonModal.defaultProps = {
  visible: false,
  loading: false,
  onOk: () => {},
}

export default PersonModal
