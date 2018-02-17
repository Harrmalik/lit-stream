'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removePlaylist, editPlaylist, setPlaylistTracks, setQueue, nowPlaying } from '../actions'
import moment from 'moment'

// Components
import Track from '../components/Track'

class ChannelPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          playlists: []
        }
    }

    componentDidMount() {
        let component = this

        $.ajax({
          url: `/api/getChannel?query=${this.props.match.params.channelId}`
      }).done((channel) => {
          console.log(channel);
          component.setState({
              ...channel,
              tracks: _.map(channel.tracks, track => {
                  let title = track.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

                  return {
                      id: track.id,
                      url: `https://www.youtube.com/watch?v=${track.id}`,
                      channelTitle: track.channelTitle,
                      title: track.title,
                      platform: 'youtube',
                      track: title[1],
                      artist: title[0].trim(),
                      liked: false,
                      created: moment(track.publishedAt),
                      isSeeking: false,
                      played: 0,
                      playing: true
                  }
              })
           })
        })
    }

    render() {
        return (
            <div className="page">
              {this.state.playlists.length > 0 ? <h2 className="ui header">{this.state.playlists[0].snippet.channelTitle}</h2> : null}

              <h2>Recent Tracks</h2>
              <table id="library" className="ui table striped very compact selectable">
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

                  <tbody id="tracks">
                  {_.map(this.state.tracks, (song, index) => {
                      return (
                          <Track
                              key={song.id}
                              track={song}
                              view={'playlist'}></Track>
                      )
                  })}
                  </tbody>
              </table>

              <div className="ui three column grid">
                {_.map(this.state.playlists, (playlist) => {
                    return (
                        <div className="column" key={playlist.id}>
                          <div className="ui fluid link card">
                            <div className="image">
                              <img src={playlist.snippet.thumbnails.standard.url}/>
                            </div>
                            <div className="content">
                              <a className="header" href={`#/youtube/${playlist.id}`}>{playlist.snippet.title}</a>
                              <div className="meta">{playlist.snippet.description}</div>
                            </div>
                          </div>
                        </div>
                    )
                })}
              </div>
            </div>
        )
    }
}

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
)(ChannelPage)
