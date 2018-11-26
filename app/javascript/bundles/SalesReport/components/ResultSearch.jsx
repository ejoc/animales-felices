import React from 'react'
import { Table, Pagination, Divider } from 'antd'
import moment from 'moment'
import { getInvoices } from '../../../api'

const columns = [
  {
    title: 'NO.',
    dataIndex: 'no',
    key: 'no',
    render: record => <span>{record}</span>,
  },
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
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href={`/invoices/${record.id}.pdf`}>PDF</a>
        <Divider type="vertical" />
        <a href={`/invoices/${record.id}.pdf`}>XML</a>
      </span>
    ),
  },
]

class ResultSearch extends React.PureComponent {
  state = {
    data: [],
    meta: {},
    loading: false,
  }
  componentDidMount() {
    this.fetchInvoices()
  }

  componentDidUpdate(prevProps) {
    const { searchTerm, page } = this.props
    if (searchTerm !== prevProps.searchTerm) {
      this.fetchInvoices(page)
    }
  }

  handlePageChange = page => {
    this.fetchInvoices(page)
  }

  fetchInvoices = page => {
    const { searchTerm } = this.props
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
        <br />
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
