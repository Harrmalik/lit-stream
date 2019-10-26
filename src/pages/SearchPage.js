'use strict'

// Dependencies
import React from 'react'
import SearchBox from '../components/SearchBox'
import Results from '../components/Results'

class SearchPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: []
      }

      this.updateResults = this.updateResults.bind(this)
    }

    updateResults(data) {
        this.setState({ data })
    }

    render() {
        return (
            <div className="page">
                <SearchBox
                    callback={this.updateResults} showEngines="true"></SearchBox>

                <Results
                    data={this.state.data ? this.state.data : null}></Results>
            </div>
        )
    }
}

export default SearchPage