import React from 'react'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'

let SidePane = React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        return (
            <section id="SidePane">
                <Link to="/search"><SearchBox
                    callback={this.props.parent.updateResults}></SearchBox></Link>
                <h3 className="ui header"><Link to="/search">Search</Link></h3>
                <h3 className="ui header"><Link to="/player">Player</Link></h3>
                <h3 className="ui header"><Link to="/library">Library</Link></h3>
                <h3 className="ui header"><Link to="/queue">Queue</Link></h3>
                <h3 className="ui header"><Link to="/settings">Settings</Link></h3>
                <h3 className="ui header"><Link to="/history">History</Link></h3>
            </section>
        )
    }
})

export default SidePane
