import React from 'react'
import MediaPlayer from './MediaPlayer'

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
            this._child.nowPlaying(queue[0].id)
        }
    },
    getNextTrack(event) {
        let component = this
        let queue = component.state.queue
        queue.shift()
        component.setState({queue})

        if (queue.length >= 1) {
            this._child.nowPlaying(queue[0].id)
            event.target.playVideo();
        } else {
            //this._child.stopPlayer(event)
            //event.target.playVideo();

        }
    },
    stopPlayer() {
        this._child.stopPlayer();
    },
    playNow(index, track) {
        let component = this
        let queue = component.state.queue
        queue.shift()
        queue.splice(index, 0)
        queue.splice(0, 1, track)
        component.setState({queue})
        this._child.nowPlaying(queue[0].id)
        this._child.playVideo()
    },
    render() {
        let component = this
        return (
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this._child = child;}}
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
                <a className="ui tiny image">
                    <img src={this.props.track.thumbnail}></img>
                </a>
                <div className="content">
                    <a className="header" onClick={this.startThis}>{this.props.track.title}</a>
                </div>
            </div>
        )
    }
})

export default MediaTray
