'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cc, setQueue, nowPlaying, removeTrack } from '../actions'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'
import MediaPlayer from '../components/MediaPlayer'

class SidePane extends React.Component {
    componentDidMount() {
        $('#SidePane a').on('click', (e) =>{
            $('#SidePane h3').removeClass('active')
            $(e.target).parent().addClass('active')
        })

        $( ".droppable" ).droppable({
          drop: function( event, ui ) {
            console.log('yoooo');
          }
        });
    }

    render() {
      let currentPage = this.props.match.params.page
        return (
            <section id="SidePane" className="droppable">
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
                  <div className="ui divider"></div>
                  <h3 className="item ui">
                    <Link to="/library">Library</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/queue">Queue</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/history">History</Link>
                  </h3>

                  <div className="item">
                    <div className="ui button fluid green"><i className="plus icon"></i> New Playlist</div>
                  </div>
                </div>
                <MediaPlayer></MediaPlayer>
            </section>
        )
    }
}

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    removeTrack: bindActionCreators(removeTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePane)
