import React from 'react'
import MediaPlayer from './MediaPlayer'
import MediaControls from './MediaControls'

var MediaTray = React.createClass({
    getInitialState() {
        return {
            queue:[]
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
        }
    },
    playPlayer() {
        this.mediaPlayer.playPlayer()
    },
    stopPlayer() {
        this.mediaPlayer.stopPlayer();
    },
    getNextTrack() {
        let component = this
        let queue = component.state.queue
        queue.shift()
        component.setState({queue})

        if (queue.length >= 1) {
            this.mediaPlayer.nowPlaying(queue[0].id)
            this.playPlayer()
        } else {
            // TODO: No songs left
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
        queue.shift()
        queue.splice(index - 1, 1)
        queue.splice(0, 0, track)
        component.setState({queue})
        this.mediaPlayer.nowPlaying(queue[0].id)
        this.mediaPlayer.playVideo()
    },
    render() {
        let component = this
        return (
            <section>
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this.mediaPlayer = child;}}
                    parent={this}></MediaPlayer>

                <div id="queue" className="ui items">
                    {_.map(component.state.queue, function(track, index) {
                        return (
                            <Track
                                key={track.id}
                                track={track}
                                parent={component}
                                position={index}></Track>
                        )
                    })}
                </div>
            </div>
            <MediaControls
                parent={this}></MediaControls>
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

export default MediaTray
