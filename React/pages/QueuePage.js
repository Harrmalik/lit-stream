'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cc, setQueue, nowPlaying, removeTrack } from '../actions'

// Components
import HistoryPage from './HistoryPage'

class QueuePage extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          view: 'upnext'
      }

      this.addToLibrary = this.addToLibrary.bind(this)
    }

    componentDidMount() {
        let component = this
        $('#queue').sortable({
          update: function( event, ui ) {
              let queue = component.props.queue
              queue.splice(queue.findIndex(track=> track.id == ui.item[0].id), 1)
              queue.splice($('#queue').find(`#${ui.item[0].id}`).index(), 0, {
                  id: ui.item[0].id,
                  title: $('#queue').find(`#${ui.item[0].id}`).data("title"),
                  thumbnail: $('#queue').find(`#${ui.item[0].id}`).data("thumbnail"),
                  genre: $('#queue').find(`#${ui.item[0].id}`).data("genre"),
                  url: $('#queue').find(`#${ui.item[0].id}`).data("url"),
                  type: $('#queue').find(`#${ui.item[0].id}`).data("type"),
                  platform: $('#queue').find(`#${ui.item[0].id}`).data("platform"),
                  isSeeking: $('#queue').find(`#${ui.item[0].id}`).data("isSeeking"),
                  played: $('#queue').find(`#${ui.item[0].id}`).data("played"),
                  playing: $('#queue').find(`#${ui.item[0].id}`).data("playing")
              })
              component.props.setQueue(queue)
          }
        });
    }

    getRelated() {
        // TODO: Get related songs when queue is finished
        //         $.ajax({
        //             url: `/api/getRelated`,
        //             data: { query },
        //             crossDomain : true,
        //             dataType: 'json',
        //             success: function(data) {
        //                 component.mediaPlayer.nowPlaying(data[0].id.videoId)
        //                 queue.push({
        //                     id: data[0].id.videoId,
        //                     title: data[0].snippet.title,
        //                     thumbnail: data[0].snippet.thumbnails.default.url
        //                 })
        //                 scroller(`Lit Stream: ${data[0].snippet.title}`, 'document')
        //                 component.setState({queue})
        //                 component.setState({nowPlaying: queue[0]})
        //                 $('#searchBox').val('')
        //             }
        //         });
    }

    addToLibrary(track) {
        let library
        if (localStorage.getItem('library')) {
            library = JSON.parse(localStorage.getItem('library'))
            library.push(track)
        } else {
            library = [track]
        }

        localStorage.setItem('library', JSON.stringify(library));
    }

    render() {
        let component = this
        return (
            <div id="queuePage" className="page" style={{display: 'none'}}>
                <div className="ui menu fluid two item">
                  <a className={this.state == 'upnext' ? "active item" : "item"} onClick={()=>{this.setState({view:'upnext'})}}>
                    Up Next
                  </a>
                  <a className={this.state == 'history' ? "active item" : "item"} onClick={()=>{this.setState({view:'history'})}}>
                    History
                  </a>
                </div>
                <div className="ui divider"></div>
                { this.state.view == 'upnext' ?
                <div id="queue" className="ui divided feed">
                    {_.map(component.props.queue, function(track, index) {
                        return (
                            <Track
                                key={track.id + (Math.floor(Math.random() * 100000) + 1)  }
                                track={track}
                                parent={component}
                                position={index}></Track>
                        )
                    })}
                </div>
                :                 <div id="queue" className="ui divided feed">
                                    {_.map(this.props.history, function(track, index) {
                                        return (
                                            <Track
                                                key={track.id + (Math.floor(Math.random() * 100000) + 1)  }
                                                track={track}
                                                parent={component}
                                                position={index}></Track>
                                        )
                                    })}
                                </div> }
            </div>
        )
    }
}

class Track extends React.Component {
    constructor(props) {
      super(props)

      this.startTrack = this.startTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.addToLibrary = this.addToLibrary.bind(this)
      this.renderPlatform = this.renderPlatform.bind(this)
    }

    startTrack() {
        this.props.parent.props.nowPlaying(this.props.track)
    }

    removeTrack() {
        this.props.parent.props.removeTrack(this.props.track)
    }

    addToLibrary() {
        this.props.parent.addToLibrary(this.props.track)
    }

    renderPlatform() {
        let icon,platform

        switch (this.props.track.platform) {
            case 'youtube':
                icon = 'red youtube'
                break;
            case 'soundcloud':
                icon = 'orange soundcloud'
                break;

        }
        return (
             <i className={`ui big ${icon} icon`}></i>
        )
    }

    render() {
        let track = this.props.track
        return (
            <div className="event track" id={this.props.track.id}
                data-title={this.props.track.title}
                data-thumbnail={this.props.track.thumbnail}
                data-genere={this.props.track.genere}
                data-url={this.props.track.url}
                data-type={this.props.track.type}
                data-platform={this.props.track.platform}
                data-isSeeking={this.props.track.isSeeking}
                data-playing={this.props.track.playing}
                data-played={this.props.track.played}>
              <div className="label">
                <img className="ui tiny image" src={this.props.track.thumbnail}></img>
              </div>
              <div className="content">
                <div className="date">
                  {this.props.track.artist}
                </div>
                <div className="summary">
                  <i className="remove icon" onClick={this.removeTrack}></i>
                  {this.props.parent.props.currentTrack.id == this.props.track.id ?
                      <i className="volume up icon"></i>
                  : null }
                  <span className={this.props.parent.props.currentTrack.id == this.props.track.id ?
                  'ui blue header' : 'ui'} onClick={this.startTrack}>{this.props.track.track}</span>
                </div>
              </div>
            </div>
        )
    }
}

//<a className="ui blue tiny circular label">{this.props.position + 1}</a>

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying,
  history: state.history
})

const mapDispatchToProps = dispatch => ({
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    removeTrack: bindActionCreators(removeTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueuePage)
