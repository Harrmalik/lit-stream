'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, setQueue, nowPlaying, removeTrack } from '../actions'

class PlaylistPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        library: []
      }

      this.getSongs = this.getSongs.bind(this)
      this.playAll = this.playAll.bind(this)
    }

    componentWillMount() {
        if (localStorage.getItem('library')) {
            this.setState({ library: JSON.parse(localStorage.getItem('library')) })
        }
    }

    getSongs() {
        $.ajax({
            url: '',
            data: {

            }
        }).success((songs) => {
            // TODO: get songs and add them to state
        }).fail((message) => {
            // TODO: handle failure to load tracks
        })
    }

    componentDidMount() {
        this.getSongs()
    }

    playAll() {
        this.props.setQueue(this.state.library)
    }

    render() {
      let playlist = this.props.match.params.playlist
        return (
            <div id="libraryContainer">
              <div className="ui inverted blue segment">
                <h2 className="ui header">
                {playlist}
                <div className="sub header">Music Im listening too now</div>
                </h2>
              </div>
              <table id="library" className="ui table striped compact">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Title</th>
                          <th>Artist</th>
                          <th>Liked</th>
                          <th>Date added</th>
                          <th>Platform</th>
                      </tr>
                  </thead>

                  <tbody>
                  {_.map(this.state.library, (song, index) => {
                      return (
                          <Track
                              key={song.url}
                              track={song}
                              parent={this}></Track>
                      )
                  })}
                  </tbody>
              </table>
              <button className="ui button basic" onClick={this.playAll}>Play All songs</button>
              <p id="libraryHUD">{this.state.library.length} songs</p>
            </div>
        )
    }
}

class Track extends React.Component {
    constructor(props) {
      super(props)

      this.startTrack = this.startTrack.bind(this)
    }

    startTrack() {
        let parent = this.props.parent.props
        let track = this.props.track
        track.no
        parent.updateQueue(this.props.track, false)
        if (parent.queue.length > 0) {
            parent.nowPlaying(this.props.track)
        }
    }

    render() {
        let track = this.props.track
        return (
            <tr key={track.url} onClick={this.startTrack}>
                <td>
                    <div className="ui checkbox">
                        <input type="checkbox"></input>
                        <label></label>
                    </div>
                </td>
                <td>{track.title}</td>
                <td>{track.url}</td>
                <td>{track.liked ? <i className="heart icon"></i> : <i className="empty heart icon"></i>}</td>
                <td>July 4th</td>
                <td>{track.platform}</td>
            </tr>
        )
    }
}


const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    updateQueue: bindActionCreators(updateQueue, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPage)
