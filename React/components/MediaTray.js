import React from 'react'
import MediaPlayer from './MediaPlayer'
import MediaControls from './MediaControls'
import moment from 'moment'

var MediaTray = React.createClass({
    getInitialState() {
        return {
            queue:[],
            nowPlaying: {},
            history: [],
            options: {
                shuffle: true,
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
    updateQueue(newTrack, newIndex) {
        let component = this
        let queue = component.state.queue
        queue.push(newTrack)
        component.setState({queue})

        if (queue.length === 1) {
            this.mediaPlayer.nowPlaying(queue[0].id)
            component.setState({nowPlaying: queue[0]})
        }
    },
    playPlayer() {
        this.mediaPlayer.playPlayer()
    },
    stopPlayer() {
        this.mediaPlayer.stopPlayer();
    },
    getNextTrack(id) {
        let component = this
        let queue = component.state.queue
        let history = component.state.history
        let options = component.state.options
        let nowPlaying = component.state.nowPlaying
        let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)
        console.log(nowPlaying)
        console.log(prevIndex)
        let query = queue[prevIndex].id

        history.push(queue[prevIndex])
        queue.splice(prevIndex,1)

        let index = options.shuffle ? Math.floor(Math.random() * ((queue.length-0)+0) + 0) : 0
        component.setState({queue})

        if (queue.length >= 1) {
            component.mediaPlayer.nowPlaying(queue[index].id)
            scroller(`Lit Stream: ` + queue[index].title, 'document')
            this.playPlayer()
            component.setState({nowPlaying: queue[index]})
        } else {
            // TODO: No songs left
            $.ajax({
                url: `/api/getRelated`,
                data: { query },
                crossDomain : true,
                dataType: 'json',
                success: function(data) {
                    component.mediaPlayer.nowPlaying(data[0].id.videoId)
                    queue.push({
                        id: data[0].id.videoId,
                        title: data[0].snippet.title,
                        thumbnail: data[0].snippet.thumbnails.default.url
                    })
                    scroller(`Lit Stream: ${data[0].snippet.title}`, 'document')
                    component.setState({queue})
                    component.setState({nowPlaying: queue[0]})
                    $('#searchBox').val('')
                }
            });
        }
    },
    prevTrack() {

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
        let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)

        history.push(queue[0])
        queue.splice(prevIndex,1)
        // queue.splice(index - 1, 1)
        // queue.splice(0, 0, track)
        component.setState({
            queue,
            nowPlaying: track
        })

        scroller(`Lit Stream: ` + track.title, 'document')
        this.mediaPlayer.nowPlaying(track.id)
        this.mediaPlayer.playVideo()
    },
    getHistory() {
        $('.ui.modal')
          .modal('show')
        ;
    },
    render() {
        let component = this
        return (
            <section>
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this.mediaPlayer = child;}}
                    parent={this}></MediaPlayer>

                <button onClick={this.getHistory}>History</button>
                <History
                    history={this.state.history}
                    parent={this}></History>

                <div id="queue" className="ui items">
                    {_.map(component.state.queue, function(track, index) {
                        return (
                            <Track
                                key={track.id + moment().unix()}
                                track={track}
                                parent={component}
                                position={index}></Track>
                        )
                    })}
                </div>
            </div>
            <MediaControls
                parent={this}
                track={this.state.nowPlaying}></MediaControls>
            </section>
        )
    }
})

var Track = React.createClass({
    getInitialState() {
        return {
            data:''
        }
    },
    startThis() {
        this.props.parent.playNow(this.props.position, this.props.track)
    },
    removeTrack() {
        this.props.parent.remove(this.props.position)
    },
    render() {
        return (
            <div className="item track" id={this.props.track.id} data-title={this.props.track.title} data-thumbnail={this.props.track.thumbnail}>
                <div className="content">
                    <i className="remove icon" onClick={this.removeTrack}></i>
                    <a className="header" onClick={this.startThis}>{this.props.track.title}</a>
                </div>
            </div>
        )
    }
})

var History = React.createClass({
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
                <div id="queue" className="ui items">
                    {_.map(component.props.history, function(track, index) {
                        return (
                            <Track
                                key={track.id + moment().unix()}
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

var scroller = function(text, element) {
    (function titleScroller(text) {
        if (element === 'document') {
            document.title = text;
        } else {

        }
        setTimeout(function () {
            titleScroller(text.substr(1) + text.substr(0, 1));
        }, 800);
    }(text));
}

export default MediaTray
