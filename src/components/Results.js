// Dependencies
import React from 'react'
import $ from 'jquery';
import _ from 'lodash';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue } from '../actions'
import moment from 'moment'

// Components
import Liked from './Liked'

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }

    this.updateQueue = this.updateQueue.bind(this)
  }
  updateQueue(newTrack, upNext) {
      newTrack.playing = true
      newTrack.played = 0
      newTrack.isSeeking = false
      this.props.updateQueue(newTrack, upNext)
  }

  render() {
      let data = this.props.data,
        component = this

        data = this.props.data

      return (
          <div className="ui divided items" id="Results">
              {_.map(data, (result) => {
                  return (
                      <Result
                          key={result.id}
                          result={result}
                          playlists={this.props.playlists}
                          callback={component.updateQueue}></Result>
                  )
              })}
          </div>
      )
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props)

    this.add = this.add.bind(this)
    this.like = this.like.bind(this)
    this.upNext = this.upNext.bind(this)
    this.renderPlatform = this.renderPlatform.bind(this)
  }

  componentDidMount() {
    //$('.ui.dropdown').dropdown()
  }

  add() {
    switch (this.props.result.type) {
      case 'video':
        let title = this.props.result.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

        this.props.callback({
          ...this.props.result,
          track: title[1] ? title[1] : title[0],
          artist: title[1] ? title[0].trim() : this.props.result.channelTitle.split('-')[0].trim()
        }, false)
        break;

      case 'channel':
          // location.hash = `#/channel/${this.props.result.id}`
          break;

      case 'playlist':
          // document.location.hash = `#/playlist/YT${this.props.result.id}`
          break;
      default:
    }

  }

  like(track) {
    let playlists = this.props.playlists,
        playlistName = 'liked',
        playlist = playlists[playlists.findIndex(playlist => playlist.name.toLowerCase().replace(/\s/g, '') === playlistName)],
        title = track.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

    playlist.tracks.push({
      ...track,
      track: title[1],
      artist: title[0].trim(),
      liked: true,
      created: moment(),
      isSeeking: false,
      played: 0,
      playing: true
    })
    playlists[1] = playlist //change index
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }

  upNext() {
    let title = this.props.result.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

    this.props.callback({
      ...this.props.result,
      track: title[1],
      artist: title[0].trim()
    }, true)
  }

  renderPlatform() {
      let icon

      switch (this.props.result.platform) {
          case 'youtube':
              icon = 'red youtube'
              break;
          case 'soundcloud':
              icon = 'orange soundcloud'
              break;
          default:

      }
      return (
           <i className={`ui big ${icon} icon`}></i>
      )
  }

  render() {
      let playlists = this.props.playlists

      return (
          <div className="item">
              <span className="ui tiny image">
                  <img src={this.props.result.thumbnail} alt={this.props.result.title}></img>
              </span>
            <div className="content">
              <div className="description">
                  <h3 onClick={this.add}>{this.props.result.title}</h3>
              </div>
              <div className="meta">
                  { this.props.result.type === 'video' ? <i className="plus icon" onClick={this.add}></i> : null }
                  { this.props.result.type === 'video' ? <i className="forward icon" onClick={this.upNext}></i> : null }
                  <Liked track={this.props.result}/>
                  <div className="ui dropdown">
                    <i className="ellipsis horizontal icon" onClick={(e) => { $(e.target).parent().dropdown('show')}}></i>
                    <div className="menu">
                      <Liked track={this.props.result}/>
                      <a className="item" href={`http://www.flvto.biz/downloads/mp3/yt_${this.props.result.id}/`} target='_blank' rel="noopener noreferrer">
                        Download
                      </a>
                      <div className="item">
                        More like this
                      </div>
                      <div className="divider"></div>
                      <div className="item">
                        <i className="dropdown icon"></i>
                        Add to Playlist
                        <div className="menu" >
                          { _.map(playlists, (playlist, index) => {
                            return <PlaylistItem key={playlist.name} playlists={playlists} playlist={playlist} index={index} track={this.props.result}/>
                          })}
                        </div>
                      </div>
                      <div className="item">New Playlists</div>
                    </div>
                  </div>
                  {this.renderPlatform()}
                  <span className="ui blue label">{this.props.result.type}</span>
              </div>
            </div>
          </div>
      )
  }
}

class PlaylistItem extends React.Component {
  constructor(props) {
    super()

    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this)
  }

  addTrackToPlaylist() {
    let playlist = this.props.playlist,
        playlists = this.props.playlists,
        title = this.props.track.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-')

    playlist.tracks.push({
      ...this.props.track,
      track: title[1],
      artist: title[0].trim(),
      liked: false,
      created: moment(),
      isSeeking: false,
      played: 0,
      playing: true
    })
    playlists[this.props.index] = playlist
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }4

  render() {
    return (
      <div className="item" onClick={this.addTrackToPlaylist}>{this.props.playlist.name}</div>
    )
  }
}

const mapStateToProps = state => ({
  queue: state.queue,
  playlists: state.playlists
})

const mapDispatchToProps = dispatch => ({
  updateQueue: bindActionCreators(updateQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
