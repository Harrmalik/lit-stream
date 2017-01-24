import React from 'react'
import ReactDom from 'react-dom'
import SearchBox from './components/SearchBox'
import Results from './components/Results'
import MediaPlayer from './mediaPlayer'

var App = React.createClass({
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
            <div className="main">
                <section className="ui container">
                    <SearchBox
                        callback={this.updateResults}></SearchBox>
                    <Results
                        data={this.state.data ? this.state.data : null}></Results>
                </section>

                <footer>

                </footer>
            </div>
        )
    }
})

ReactDom.render(<App />,
document.getElementById('react-app'))
