import React from 'react';
import api from '../../api';

function withSubscription(selectList) {
  // ...and returns another component...
  return (WrappedComponent) => {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
        this.state = {
          data: [],
          searchText: '',
          loading: false,
        }
      }

      // componentDidMount() {
      //   selectList(
      //     api,
      //     undefined,
      //     (data) => {
      //       this.setState({
      //         data,
      //         loading: false,
      //       })
      //     },
      //     err => console.warn(err),
      //   )
      // }

      handleSearchText = (e) => {
        this.setState({ searchText: e.target.value })
      }

      onSearch(input) {
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

      handleRowClick = (row) => {
        const { onRowClick } = this.props
        if (typeof onRowClick === "function") {
          onRowClick(row)
          this.setState({ data: [], searchText: '', })
          // this.setState({ searchText: '', })
        }
      }

      render() {
        const { data, loading, searchText } = this.state
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return (
          <WrappedComponent
            searchText={searchText}
            onSearchTextChange={this.handleSearchText}
            data={data}
            loading={loading}
            onSearch={this.onSearch}
            {...this.props}
            onRowClick={this.handleRowClick}
          />
        )
      }
    }

    return ConnectedComponent
  }
}

export default withSubscription
