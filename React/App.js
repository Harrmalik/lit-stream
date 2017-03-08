import React from 'react'
import ReactDom from 'react-dom'
import SearchBox from './components/SearchBox'
import Results from './components/Results'
import MediaTray from './components/MediaTray'

var containerStyle = {
    width: "80%"
}

var App = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    addToQueue(newTrack) {
        this._child.updateQueue(newTrack)
    },
    render() {
        return (
            <div className="main" style={ !this.state.data ? {} : containerStyle}>
                <section>
                    <SearchBox
                        callback={this.updateResults}></SearchBox>

                    <Results
                        data={this.state.data ? this.state.data : null}
                        addToQueue={this.addToQueue}></Results>

                    <MediaTray
                        ref={(child) => {this._child = child;}}
                        parent={this}></MediaTray>
                </section>

                <footer>

                </footer>
            </div>
        )
    }
})

ReactDom.render(<App />,
document.getElementById('react-app'))
