import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, nowPlaying, nextTrack } from '../actions'

let QueuePage = React.createClass({
    getInitialState() {
        return {}
    },
    render() {
        let component = this
        console.log(this.props.currentTrack);
        return (
            <div className="page">
                <div id="queue" className="ui items">
                    {_.map(component.props.queue, function(track, index) {
                        console.log(track);
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
        let track = this.props.track
        return (
            <div className="item track" id={track.id} data-title={track.title} data-thumbnail={track.thumbnail} data-type={track.type} data-platform={track.platform}>
                <div className="content">
                    <i className="remove icon" onClick={this.removeTrack}></i>
                    <a onClick={this.startThis}>{this.props.track.title}</a>
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
    updateQueue: bindActionCreators(updateQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueuePage)
