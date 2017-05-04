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
                  thumbnail: $('#queue').find(`#${ui.item[0].id}`).data("thumbnail")
              })
              component.props.setQueue(queue)
          }
        });
    },
    remove(index) {
        let component = this
        let queue = component.state.queue
        queue.splice(index, 1)
        component.setState({queue})
        if (index == 0) {
            component.getNextTrack();
        }
    },
    getRelated() {
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
        console.log(this.props.queue);
        return (
            <div className="page">
                <h2 className="ui header">Queue</h2>
                <div id="queue" className="ui items">
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
    render() {
        let track = this.props.track
        return (
            <div className="item track" id={this.props.track.id} data-title={this.props.track.title} data-thumbnail={this.props.track.thumbnail}>
                <div className="content">
                    <i className="remove icon" onClick={this.removeTrack}></i>
                    {this.props.parent.props.currentTrack.id == this.props.track.id ?
                        <i className="volume up icon"></i>
                    : <a className="ui blue circular label">{this.props.position + 1}</a>}
                    <a className={this.props.parent.props.currentTrack.id == this.props.track.id ?
                    'ui blue header' : 'header'} onClick={this.startThis}>{this.props.track.title}</a>
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
