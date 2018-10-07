import React from 'react'
import api from '../../api'

function withPersonModal(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.onSearch = this.onSearch.bind(this)
      this.state = {
        data: [],
        loading: false,
      }
    }

    onSearch(input) {
      // console.log('adsasd', input)
      this.setState({
        loading: true,
      }, () => {
        selectData(
          api,
          input,
        ).then(
          ({ data }) => {
            // console.log(data)
            this.setState({
              data,
              loading: false,
            })
          },
          err => console.log(err),
        )
      })
    }

    render() {
      const { data, loading } = this.state
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          data={data}
          loading={loading}
          onSearch={this.onSearch}
          {...this.props}
        />
      )
    }
  }
}

export default withPersonModal
