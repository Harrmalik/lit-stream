import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, setQueue, nowPlaying, removeTrack } from '../actions'

let QueuePage = React.createClass({
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
    },
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.currentTrack.title == nextProps.currentTrack.title) {
            return false
        } else {
            return true
        }
    },
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
    },
    render() {
        let component = this
        return (
            <div className="page">
                <h2 className="ui header">Queue</h2>
                <div id="queue" className="ui divided items">
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
            </div>
        )
    }
})

let Track = React.createClass({
    startThis() {
        this.props.parent.props.nowPlaying(this.props.track)
    },
    removeTrack() {
        this.props.parent.props.removeTrack(this.props.track)
    },
    renderPlatform() {
        let color,platform

        switch (this.props.track.platform) {
            case 'youtube':
                color = 'red'
                break;
            case 'soundcloud':
                color = 'orange'
                break;

        }
        return (

             <a className={`ui ${color} label`}>{this.props.track.platform}</a>
        )
    },
    render() {
        let track = this.props.track
        return (
            <div className="item track" id={this.props.track.id}
                data-title={this.props.track.title}
                data-thumbnail={this.props.track.thumbnail}
                data-genere={this.props.track.genere}
                data-url={this.props.track.url}
                data-type={this.props.track.type}
                data-platform={this.props.track.platform}
                data-isSeeking={this.props.track.isSeeking}
                data-playing={this.props.track.playing}
                data-played={this.props.track.played}>
                <a className="ui tiny image">
                    <img src={this.props.track.thumbnail}></img>
                </a>
              <div className="content">
                <div className="description">
                    <i className="remove icon" onClick={this.removeTrack}></i>
                    {this.props.parent.props.currentTrack.id == this.props.track.id ?
                        <i className="volume up icon"></i>
                    : <a className="ui blue circular label">{this.props.position + 1}</a>}
                    <a className={this.props.parent.props.currentTrack.id == this.props.track.id ?
                    'ui blue header' : 'ui header'} onClick={this.startThis}>{this.props.track.title}</a>
                </div>
                <div className="meta">
                    <i className="empty heart icon"></i>
                    <span>Add to playlist</span>
                    {this.renderPlatform()}
                </div>
              </div>
            </div>
        )
    }
})

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    removeTrack: bindActionCreators(removeTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueuePage)
