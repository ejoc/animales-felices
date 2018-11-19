import React from 'react'
import { Input } from 'antd'

// import * as jsPDF from 'jspdf'
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

  handleExport = e => {
    e.preventDefault()
    console.log('sfsdf', pdf)
  }

  render() {
    const { searchTerm } = this.state
    return (
      <Layout {...this.props} activeNav="sales-reports">
        <div style={{ padding: '60px 120px' }}>
          <div style={{ paddingBottom: '15px' }}>
            <Search
              onSearch={this.handleSearch}
              placeholder="Buscar por cliente o por proveedor"
            />
          </div>
          <ResultSearch searchTerm={searchTerm} />
        </div>
      </Layout>
    )
  }
}

export default SalesReportApp
