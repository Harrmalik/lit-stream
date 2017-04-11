import React from 'react'
import ReactDom from 'react-dom'
import SidePane from './components/SidePane'
import Results from './components/Results'
import MediaTray from './components/MediaTray'
import Library from './components/Library'

let containerStyle = {
    width: "100%",
    height: "100%"
}

let App = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    componentDidMount() {
        $('.ui.sidebar')
          .sidebar('toggle')
        ;
    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    addToQueue(newTrack, upNext) {
        this._child.updateQueue(newTrack, upNext)
    },
    render() {
        console.log(this.state.data)
        return (
            <div className="main" style={ !this.state.data ? {} : containerStyle}>
                <SidePane parent={this}></SidePane>
                <section id="Search" className="ui">
                    <Results
                        data={this.state.data ? this.state.data : null}
                        addToQueue={this.addToQueue}></Results>
                </section>

                <section className="pusher" style={containerStyle}>
                    <Library></Library>
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
