import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nextTrack, prevTrack } from '../actions'

var MediaControls = React.createClass({
    prevTrack() {
        this.props.prevTrack(this.props.nowPlaying)
    },
    playTrack() {
        this.props.controls.playVideo()
    },
    stopTrack() {
        this.props.controls.pauseVideo()
    },
    nextTrack() {
        this.props.nextTrack(this.props.nowPlaying)
    },
    shuffle() {
        this.props.shuffle()
    },
    repeat() {
        this.props.repeat()
    },
    render() {
        let controls = this.props.controls
        if (controls) {
            let duration = controls.getDuration()
            return (
                <div id="HUD" className="ui raised inverted segment">
                        <div id="hudcontainer">
                        <div id="MediaControls">
                            <i className="step random icon" onClick={this.shuffle}></i>
                            <i className="step backward icon" onClick={this.prevTrack}></i>
                            <i className="big play icon" onClick={this.playTrack}></i>
                            <i className="big stop icon" onClick={this.stopTrack}></i>
                            <i className="step forward icon" onClick={this.nextTrack}></i>
                            <i className="step repeat icon" onClick={this.repeat}></i>
                        </div>

                        <p>
                            Now Playing: {this.props.nowPlaying.title}
                        </p>
                        <p>
                            <span>Duration {Math.floor(duration / 60) + '.' + (duration %60).toFixed(0)}</span>
                        </p>
                        </div>

                </div>
            )
        } else {
            return (
                <div id="HUD" className="ui raised inverted segment">

                </div>
            )
        }

    }
})

const mapStateToProps = state => ({
    controls: state.controls,
    nowPlaying: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    nextTrack: bindActionCreators(nextTrack, dispatch),
    prevTrack: bindActionCreators(prevTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaControls)
