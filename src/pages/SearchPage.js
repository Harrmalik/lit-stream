// Dependencies
import React from 'react'
import SearchBox from '../components/SearchBox'
import Results from '../components/Results'

class SearchPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: [],
        loading: false
      }

      this.updateResults = this.updateResults.bind(this);
      this.updateLoading = this.updateLoading.bind(this);
    }

    updateResults(data) {
        this.setState({ data })
    }

    updateLoading(isLoading) {
      this.setState({
        loading: isLoading
      })
    }

    render() {
        return (
            <div className="page">
                <SearchBox
                    callback={this.updateResults} showEngines="true" isLoading={this.updateLoading} loading={this.state.loading}></SearchBox>

                <Results
                    data={this.state.data} loading={this.state.loading}></Results>
            </div>
        )
    }
}

export default SearchPage
