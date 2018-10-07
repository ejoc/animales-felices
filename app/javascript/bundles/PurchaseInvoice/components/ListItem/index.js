import React from 'react'
import { Table } from 'antd'

export default ({ items }) => (
  <Table
    dataSource={items}
    size="small"
    rowKey="id"
  />
)
