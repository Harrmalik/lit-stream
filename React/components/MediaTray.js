import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, nowPlaying, nextTrack } from '../actions'
import moment from 'moment'
import MediaPlayer from './MediaPlayer'
import MediaControls from './MediaControls'

let MediaTray = React.createClass({
    getInitialState() {
        return {
            queue:[],
            nowPlaying: {},
            history: [],
            options: {
                shuffle: false,
                showVideo: true,
                autoplay: true,
                repeat: false
            }
        }
    },
    componentDidMount() {
        let component = this
        $('#queue').sortable({
          update: function( event, ui ) {
              let queue = component.state.queue
              queue.splice(queue.findIndex(track=> track.id == ui.item[0].id), 1)
              queue.splice($('#queue').find(`#${ui.item[0].id}`).index(), 0, {
                  id: ui.item[0].id,
                  title: $('#queue').find(`#${ui.item[0].id}`).data("title"),
                  thumbnail: $('#queue').find(`#${ui.item[0].id}`).data("thumbnail")
              })
              component.setState({queue})
          }
        });
    },
    playPlayer() {
        this.mediaPlayer.playPlayer()
    },
    stopPlayer() {
        this.mediaPlayer.stopPlayer();
    },
    getNextTrack(e) {
        this.props.nextTrack()
        // this.props.nowPlaying({id: "NLZRYQMLDW4"})
        // let component = this
        // let queue = component.state.queue
        // let history = component.state.history
        // let options = component.state.options
        // let nowPlaying = component.state.nowPlaying
        // let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)
        // let query = queue[prevIndex].id
        // if (options.repeat) {
        //     component.playPlayer()
        // } else {
        //     history.push(queue[prevIndex])
        //     queue.splice(prevIndex,1)
        //
        //     let index = options.shuffle ? Math.floor(Math.random() * ((queue.length-0)+0) + 0) : 0
        //     component.setState({queue})
        //
        //     if (queue.length >= 1) {
        //         component.mediaPlayer.nowPlaying(queue[index].id)
        //         scroller(`Lit Stream: ` + queue[index].title, 'document')
        //         this.playPlayer()
        //         component.setState({nowPlaying: queue[index]})
        //     } else {
        //         // TODO: No songs left
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
        //     }
        // }
    },
    prevTrack() {
        let component = this
        let queue = component.state.queue
        let history = component.state.history
        let nowPlaying = component.state.nowPlaying
        let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)
        let query = queue[prevIndex].id
        let lastTrack =  history[history.length -1]
        history.push(queue[prevIndex])
        queue.splice(prevIndex,1)
        queue.splice(0,0, lastTrack)
        component.setState({queue})
        component.mediaPlayer.nowPlaying(lastTrack.id)
        component.setState({nowPlaying: queue[0]})
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
    playNow(index, track) {
        let component = this
        let queue = component.state.queue
        let history = component.state.history
        let nowPlaying = component.state.nowPlaying
        let lastTrack =  history[history.length -1]
        let prevIndex = queue.length > 1 ? queue.findIndex(track => track.id == nowPlaying.id) : history.findIndex(track => track.id == lastTrack.id)

        history.push(queue[0])
        queue.splice(prevIndex,1)
        if (queue.length == 0) {
            queue.splice(0,0, lastTrack)
        }

        component.setState({
            queue,
            nowPlaying: track
        })
        scroller(`Lit Stream: ` + track.title, 'document')
        this.mediaPlayer.nowPlaying(track.id)
    },
    getHistory() {
        $('.ui.modal')
          .modal('show')
        ;
    },
    toggleShuffle() {
        let options = this.state.options
        options.shuffle = !options.shuffle
        this.setState({options})
    },
    toggleRepeat() {
        let options = this.state.options
        options.repeat = !options.repeat
        this.setState({options})
    },
    toggleVideo() {
        let options = this.state.options
        options.showVideo = !options.showVideo
        this.setState({options})
        $('#MediaTray').toggle()
    },
    toggleLibrary() {
        $('#libraryContainer').toggle()
    },
    render() {
        let component = this
        let options = this.state.options
        if (this.props.queue.length > 0 && this.props.currentTrack == null) {
            this.props.nowPlaying(this.props.queue[0])
        }

        return (
            <section id="Overlay">
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this.mediaPlayer = child;}}
                    parent={this}></MediaPlayer>
            </div>
            </section>
        )
    }
})

let History = React.createClass({
    close() {

    },
    render() {
        let component = this
        return (
            <div className="ui modal">
              <i className="close icon"></i>
              <div className="header">
                History
              </div>
              <div className="content">
                <div id="history" className="ui items">
                    {_.map(component.props.history, function(track, index) {
                        return (
                            <Track
                                key={track.id + (Math.floor(Math.random() * 100000) + 1)}
                                track={track}
                                parent={component.props.parent}
                                position={index}></Track>
                        )
                    })}
                </div>
              </div>
              <div className="actions">
                <div className="ui black deny button">
                  Nope
                </div>
                <div className="ui positive right labeled icon button">
                  Yep, thats me
                  <i className="checkmark icon"></i>
                </div>
              </div>
            </div>
        )
    }
})

let scroller = function(text, element) {
    // (function titleScroller(text) {
    //     if (element === 'document') {
    //         document.title = text;
    //     } else {
    //
    //     }
    //     setTimeout(function () {
    //         titleScroller(text.substr(1) + text.substr(0, 1));
    //     }, 600);
    // }(text));
}

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    nextTrack: bindActionCreators(nextTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaTray)
