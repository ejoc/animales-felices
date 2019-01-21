import React from 'react'
import { Input, Card } from 'antd'

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
  }

  render() {
    const { searchTerm } = this.state
    return (
      <Layout {...this.props} activeNav="sales-reports">
        <div
          style={{
            padding: '25px 80px',
            minHeight: '700px',
            backgroundColor: '#F4F4F4',
          }}
        >
          <Card>
            <div style={{ paddingBottom: '15px' }}>
              <Search
                onSearch={this.handleSearch}
                placeholder="Buscar por número de factura, cliente o por proveedor"
              />
            </div>
            <ResultSearch searchTerm={searchTerm} />
          </Card>
        </div>
      </Layout>
    )
  }
}

export default SalesReportApp
