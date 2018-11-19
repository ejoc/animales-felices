import React from 'react'
import api from '../../api'

function withSubscription(selectList) {
  // ...and returns another component...
  return (WrappedComponent) => {
    class ConnectedComponent extends React.Component {
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
          selectList(
            api,
            input,
            (data) => {
              this.setState({
                data,
                loading: false,
              })
            },
            err => console.warn(err),
          )
        })
      }

      // onBlur = (e) => {
      //   const { target } = e
      //   const { value } = target
      //   // const value = e.target.value

      //   if (value) {
      //     selectOne(api, value).then(
      //       ({ data }) => {
      //         const item = data || {}
      //         // const { form } = this.props
      //         // form.setFieldsValue({
      //         //   supplierId: supplier.id,
      //         // })

      //         // this.setState({
      //         //   currentSupplier: supplier,
      //         // })
      //       },
      //       err => console.error(err),
      //     )
      //   }
      // }

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

    return ConnectedComponent
  }
}

export default withSubscription
