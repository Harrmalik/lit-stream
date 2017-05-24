import React from 'react'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'
import MediaPlayer from '../components/MediaPlayer'

let SidePane = React.createClass({
    getInitialState() {
        return {

        }
    },
    render() {
        return (
            <section id="SidePane">
                <Link to="/search"><SearchBox></SearchBox></Link>
                <div className="ui secondary vertical pointing menu">
                  <h3 className="item">
                    <Link to="/search">Search</Link>
                  </h3>
                  <h3 className="item">
                    <Link to="/player">Player</Link>
                  </h3>
                  <h3 className="item">
                    <Link to="/library">Library</Link>
                  </h3>
                  <h3 className="item">
                    <Link to="/queue">Queue</Link>
                  </h3>
                  <h3 className="item">
                    <Link to="/history">History</Link>
                  </h3>
                </div>
                <MediaPlayer></MediaPlayer>
            </section>
        )
    }
})

export default SidePane
