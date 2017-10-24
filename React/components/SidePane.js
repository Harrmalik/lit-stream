'use strict'

// Dependencies
import React from 'react'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'
import MediaPlayer from '../components/MediaPlayer'

class SidePane extends React.Component {
    componentDidMount() {
        $('#SidePane a').on('click', (e) =>{
            $('#SidePane h3').removeClass('active')
            $(e.target).parent().addClass('active')
        })
    }

    render() {
        return (
            <section id="SidePane">
                <Link to="/search"><SearchBox></SearchBox></Link>
                <div className="ui secondary vertical pointing menu" style={{width: "100%"}}>
                    <h3 className="item ui">
                      <Link to="/">Home</Link>
                    </h3>
                  <h3 className="item ui">
                    <Link to="/search">Search</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/player">Player</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/library">Library</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/queue">Queue</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/history">History</Link>
                  </h3>
                </div>
                <MediaPlayer></MediaPlayer>
            </section>
        )
    }
}

export default SidePane
