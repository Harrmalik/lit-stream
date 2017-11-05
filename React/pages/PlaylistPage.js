'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylist, editPlaylist, setPlaylistTracks, setQueue, nowPlaying } from '../actions'

// Components
import Track from '../components/Track'

class PlaylistPage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        playlist: {
          tracks: []
        }
      }

      this.getSongs = this.getSongs.bind(this)
      this.playAll = this.playAll.bind(this)
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

        let playlists = this.props.playlists,
            playlistName = this.props.match.params.playlist,
            playlist = playlists[playlists.findIndex(playlist => playlist.name.toLowerCase().replace(/\s/g, '') == playlistName)]

            this.setState({ playlist })
    }

    playAll() {
        this.props.nowPlaying(this.state.playlist.tracks[0])
        this.props.setQueue(this.state.playlist.tracks)
    }

    removePlaylist() {
      // TODO: save change to local storage or database
    }

    render() {
        let playlist = this.state.playlist

        return (
            <div id="libraryContainer">
              <div id="playlistHeader" className="ui segment">
                <h2 className="ui inverted header">
                  { playlist.tracks.length > 0 ? <img className="ui image" src={playlist.tracks[0].thumbnail}/> : null }
                  {playlist.name}
                  <div className="sub header">{playlist.description}</div>
                </h2>

                <button className="ui inverted active button" onClick={this.playAll}>Play All songs</button>
                <button className="ui inverted active button" onClick={() => { this.props.removePlaylist(playlist) }}>Delete Playlist</button>
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
                  {_.map(playlist.tracks, (song, index) => {
                      return (
                          <Track
                              key={song.id}
                              track={song}
                              view={'playlist'}></Track>
                      )
                  })}
                  </tbody>
              </table>
              <p id="libraryHUD">{playlist.tracks.length} songs</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue,
  playlists: state.playlists
})

const mapDispatchToProps = dispatch => ({
    removePlaylist: bindActionCreators(removePlaylist, dispatch),
    editPlaylist: bindActionCreators(editPlaylist, dispatch),
    setPlaylistTracks: bindActionCreators(setPlaylistTracks, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPage)
