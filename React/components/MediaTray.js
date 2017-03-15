import React from 'react'
import MediaPlayer from './MediaPlayer'
import MediaControls from './MediaControls'

var MediaTray = React.createClass({
    getInitialState() {
        return {
            queue:[]
        }
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
                    <button onClick={this.stopPlayer}>Stop me</button>

                <div className="ui items">
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
            <MediaControls></MediaControls>
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
    render() {
        console.log(this.props)
        return (
            <div className="item">
                <div className="content">
                    <i className="remove icon"></i>
                    <a className="header" onClick={this.startThis}>{this.props.track.title}</a>
                </div>
            </div>
        )
    }
})

export default MediaTray
