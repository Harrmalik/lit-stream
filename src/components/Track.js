// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nowPlaying, updateQueue } from '../actions'
// import $ from 'jquery';
// import _ from 'lodash';
import moment from 'moment'

// Components
import Liked from './Liked'

class Track extends React.Component {
    constructor(props) {
      super(props)

      this.startTrack = this.startTrack.bind(this)
      this.renderView = this.renderView.bind(this)
    }

    startTrack() {
        let track = this.props.track

        this.props.updateQueue(track, false)
        if (this.props.queue.length > 0) {
            this.props.nowPlaying(track)
        }
    }

    renderView() {
      let view = this.props.view

      switch (view) {
        case 'library':
          // return <LibraryView track={this.props.track} startTrack={this.props.startTrack}/>
          break;
        default:
          return <QueueView track={this.props.track} startTrack={this.props.startTrack}/>
      }
    }

    render() {
        let track = this.props.track,
            props = this.props

        if (this.props.view && this.props.view.match(/library|playlist/)) {
          return (
            <tr key={props.track.url}>
                <td>
                    <div className="ui checkbox">
                        <input type="checkbox"></input>
                        <label></label>
                    </div>
                </td>
                <td  onClick={this.startTrack}>{props.track.track}</td>
                <td>{props.track.artist}</td>
                <td><Liked track={track}/></td>
                <td>{moment(props.track.created).format('MMMM Do')}</td>
                <td><i className="red big youtube icon"></i></td>
            </tr>
          )
        } else {
          return (
            <div>
              { this.renderView() }
            </div>
          )
        }
    }
}

// const ResultsView = props => {
//   return (
//
//   )
// }

const QueueView = props => {
  return (
      <div className="item track" id={props.track.id}
          data-title={props.track.title}
          data-thumbnail={props.track.thumbnail}
          data-genere={props.track.genere}
          data-url={props.track.url}
          data-type={props.track.type}
          data-platform={props.track.platform}
          data-isSeeking={props.track.isSeeking}
          data-playing={props.track.playing}
          data-played={props.track.played}>
          <span className="ui tiny image">
              <img src={props.track.thumbnail} alt={props.track.title}></img>
          </span>
        <div className="content">
          <div className="description">
              <i className="remove icon" onClick={this.removeTrack}></i>
              {props.parent.props.currentTrack.id === props.track.id ?
                  <i className="volume up icon"></i>
              : <span className="ui blue circular label">{props.position + 1}</span>}
              <span className={props.parent.props.currentTrack.id === props.track.id ?
              'ui blue header' : 'ui header'} onClick={this.startTrack}>{props.track.title}</span>
          </div>
          <div className="meta">
              <i className="empty heart icon"></i>
              <span onClick={this.addToLibrary}>Add to library</span>
              {this.renderPlatform()}
          </div>
        </div>
      </div>
  )
}

// class Result extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.add = this.add.bind(this)
//     this.upNext = this.add.bind(this)
//     this.renderPlatform = this.renderPlatform.bind(this)
//   }
//
//   componentDidMount() {
//     //$('.ui.dropdown').dropdown()
//   }
//
//   add() {
//       this.props.callback(this.props.result, false)
//   }
//
//   upNext() {
//       this.props.callback(this.props.result, true)
//   }
//
//   renderPlatform() {
//       let icon;
//
//       switch (this.props.result.platform) {
//           case 'youtube':
//               icon = 'red youtube'
//               break;
//           case 'soundcloud':
//               icon = 'orange soundcloud'
//               break;
//           default:
//
//       }
//       return (
//            <i className={`ui big ${icon} icon`}></i>
//       )
//   }
//
//   render() {
//       let playlists = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [];
//
//       return (
//           <div className="item">
//               <span className="ui tiny image">
//                   <img src={this.props.result.thumbnail} alt={this.props.result.title}></img>
//               </span>
//             <div className="content">
//               <div className="description">
//                   <h3 onClick={this.add}>{this.props.result.title}</h3>
//               </div>
//               <div className="meta">
//                   <i className="plus icon" onClick={this.add}></i>
//                   <i className="forward icon" onClick={this.upNext}></i>
//                   <div className="ui dropdown">
//                     <i className="ellipsis horizontal icon" onClick={(e) => { $(e.target).parent().dropdown('show')}}></i>
//                     <div className="menu">
//                       <div className="item"><i className="heart pink icon"></i></div>
//                       <div className="item">
//                         Download
//                       </div>
//                       <div className="item">
//                         More like this
//                       </div>
//                       <div className="divider"></div>
//                       <div className="item">
//                         <i className="dropdown icon"></i>
//                         Add to Playlist
//                         <div className="menu" >
//                           { _.map(playlists, (playlist, index) => {
//                             return <PlaylistItem key={playlist.name} playlists={playlists} playlist={playlist} index={index} track={this.props.result}/>
//                           })}
//                         </div>
//                       </div>
//                       <div className="item">New Playlists</div>
//                     </div>
//                   </div>
//                   {this.renderPlatform()}
//               </div>
//             </div>
//           </div>
//       )
//   }
// }

// class PlaylistItem extends React.Component {
//   constructor(props) {
//     super()
//
//     this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this)
//   }
//
//   addTrackToPlaylist() {
//     let playlist = this.props.playlist,
//         playlists = this.props.playlists
//
//     playlist.tracks.push({
//       ...this.props.track,
//       isSeeking: false,
//       played: 0,
//       playing: true
//     })
//     playlists[this.props.index] = playlist
//     localStorage.setItem('playlists', JSON.stringify(playlists))
//   }
//
//   render() {
//     return (
//       <div className="item" onClick={this.addTrackToPlaylist}>{this.props.playlist.name}</div>
//     )
//   }
// }

const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    updateQueue: bindActionCreators(updateQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Track)
