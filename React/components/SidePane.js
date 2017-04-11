import React from 'react'
import SearchBox from './SearchBox'

let SidePane = React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        return (
            <section id="SidePane">
                <SearchBox
                    callback={this.props.parent.updateResults}></SearchBox>
                <h3 className="ui header">Library</h3>``
                <h3 className="ui header">Playlist</h3>
                <h3 className="ui header">Favorites</h3>
                <h3 className="ui header">History</h3>
            </section>
        )
    }
})

export default SidePane
