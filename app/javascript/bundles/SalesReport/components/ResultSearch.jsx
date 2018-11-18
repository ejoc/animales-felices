import React from 'react'
import { Table, Pagination } from 'antd'
import { getInvoices } from '../../../api'
import moment from 'moment'

const columns = [
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'client',
    render: record => <span>{record.name}</span>,
  },
  {
    title: 'Doctor',
    dataIndex: 'specialist',
    key: 'specialist',
    render: record => <span>{record.name}</span>,
  },
  {
    title: 'Fecha',
    dataIndex: 'created_at',
    key: 'created_at',
    render: record => <span>{moment(record).format('LL')}</span>,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
]

class ResultSearch extends React.PureComponent {
  state = {
    data: [],
    meta: {},
    loading: false,
  }
  componentDidMount() {
    const { searchTerm } = this.props
    this.fetchInvoices(searchTerm)
  }

  componentDidUpdate(prevProps) {
    const { searchTerm, page } = this.props
    if (searchTerm !== prevProps.searchTerm) {
      this.fetchInvoices(searchTerm)
    }
  }

  handlePageChange = page => {
    console.log(page)
  }

  fetchInvoices = (searchTerm, page) => {
    this.setState({ loading: true })
    getInvoices(
      searchTerm,
      page,
      data => {
        this.setState({ data: data.invoices, meta: data.meta, loading: false })
      },
      error => console.warn(error) || this.setState({ loading: false })
    )
  }

  render() {
    const { data, meta, loading } = this.state
    return (
      <div>
        <Table
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <Pagination
          pageSize={meta.perPage || 0}
          total={meta.totalCount || 0}
          current={meta.currentPage || 1}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }
}

export default ResultSearch
