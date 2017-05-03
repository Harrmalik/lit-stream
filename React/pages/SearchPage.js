import React from 'react'
import SearchBox from '../components/SearchBox'
import Results from '../components/Results'

let SearchPage = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    render() {
        return (
            <div className="page">
                <SearchBox
                    callback={this.updateResults}></SearchBox>

                <Results
                    data={this.state.data ? this.state.data : null}></Results>
            </div>
        )
    }
})

export default SearchPage
