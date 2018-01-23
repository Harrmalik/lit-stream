'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylist, editPlaylist, setPlaylistTracks, setQueue, nowPlaying } from '../actions'
import moment from 'moment'

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
      this.addToUpNext = this.addToUpNext.bind(this)
      this.renderView = this.renderView.bind(this)
    }

    getSongs() {
        let component = this

        $.ajax({
            url: `/api/getPlaylist?query=${this.props.match.params.playlist}`
        }).success((tracks) => {
            // TODO: Make resource to pretty prints tracks
            component.setState({playlist: {tracks : _.map(tracks, (track) => {
                let title = track.snippet.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

                return {
                    id: track.snippet.resourceId.videoId,
                    url: `https://www.youtube.com/watch?v=${track.snippet.resourceId.videoId}`,
                    channelTitle: track.snippet.channelTitle,
                    title: track.snippet.title,
                    thumbnail: track.snippet.thumbnails.default.url,
                    type: track.snippet.resourceId.kind.split('#')[1],
                    platform: 'youtube',
                    track: title[1],
                    artist: title[0].trim(),
                    liked: false,
                    created: moment(track.snippet.publishedAt),
                    isSeeking: false,
                    played: 0,
                    playing: true
                }
            })}})
        }).fail((message) => {
            // TODO: handle failure to load tracks
        })
    }

    componentDidMount() {
        this.getSongs()

        let platform = this.props.match.path.split('/')[1]

        // switch (platform) {
        //   case 'youtube': return <YoutubeView />
        //   case 'soundcloud': return <YoutubeView />
        //   default: return <DefaultView />
        // }

        // let playlists = this.props.playlists,
        //     playlistName = this.props.match.params.playlist,
        //     playlist = playlists[playlists.findIndex(playlist => playlist.name.toLowerCase().replace(/\s/g, '') == playlistName)]
        //
        //     console.log(this.props.liked);
        // if (playlistName == 'liked')
        //     playlist = {
        //         name: "Liked",
        //         description: "Waddup",
        //         tracks: this.props.liked
        //     }
        //
        // this.setState({ playlist })
    }

    playAll() {
        let playlistName = this.props.match.params.playlist

        if (playlistName == 'liked') {
            let playlist

            playlist = {
                name: "Liked",
                description: "Waddup",
                tracks: this.props.liked
            }


            this.props.nowPlaying(playlist.tracks[0])
            this.props.setQueue(playlist.tracks)
        } else {

            this.props.nowPlaying(this.state.playlist.tracks[0])
            this.props.setQueue(this.state.playlist.tracks)
        }
    }

    addToUpNext() {
      let queue = [...this.props.queue, ...this.state.playlist.tracks]
      this.props.setQueue(queue)
    }

    removePlaylist() {
      // TODO: save change to local storage or database
      // Change page
    }

    renderView() {

    }

    render() {
        // let playlist = this.state.playlist
        console.log(this.state);

        let playlists = this.props.playlists,
            playlistName = this.props.match.params.playlist,
            playlist = playlists[playlists.findIndex(playlist => playlist.name.toLowerCase().replace(/\s/g, '') == playlistName)]

            playlist = this.state.playlist

        if (playlistName == 'liked')
            playlist = {
                name: "Liked",
                description: "Waddup",
                tracks: this.props.liked
            }

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
                <button className="ui inverted active button" onClick={this.addToUpNext}>Add to Queue</button>
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

// const DefaultView = (props) => {
//     return (
//
//     )
// }

// const YoutubeView = (props) => {
//     return (
//
//     )
// }

const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue,
  playlists: state.playlists,
  liked: state.liked
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
