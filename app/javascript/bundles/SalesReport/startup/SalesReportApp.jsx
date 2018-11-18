import React from 'react'
import { Pagination, Input } from 'antd'
import Layout from '../../../shared/components/Layout'
import ResultSearch from '../components/ResultSearch'

const { Search } = Input

class SalesReportApp extends React.Component {
  state = {
    searchTerm: undefined,
  }

  handleSearch = searchTerm => {
    this.setState({ searchTerm })
  }

  render() {
    const { searchTerm } = this.state
    return (
      <Layout {...this.props} activeNav="sales-reports">
        <div style={{ padding: '60px 120px' }}>
          <div style={{ paddingBottom: '15px' }}>
            <Search onSearch={this.handleSearch} />
          </div>

          <ResultSearch searchTerm={searchTerm} />
        </div>
      </Layout>
    )
  }
}

export default SalesReportApp
