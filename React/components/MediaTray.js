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
        console.log('id: ' + newTrack)

        this._child.nowPlaying(queue[0].id)
    },
    render() {
        let component = this
        return (
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this._child = child;}}></MediaPlayer>

                <div className="ui items">
                    {_.map(component.state.queue, function(track) {
                        return (
                            <Track
                                key={track.id}
                                track={track}
                                parent={component}></Track>
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
    render() {
        return (
            <div className="item">
                <a className="ui tiny image">
                    <img src={this.props.track.thumbnail}></img>
                </a>
                <div className="content">
                    <a className="header">{this.props.track.title}</a>
                    <div className="description">
                        <p>{this.props.track.description}</p>
                    </div>
                </div>
            </div>
        )
    }
})

export default MediaTray
