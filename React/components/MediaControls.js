import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nowPlaying, nextTrack } from '../actions'

var MediaControls = React.createClass({
    stopTrack() {
        this.props.controls.pauseVideo()
    },
    playTrack() {
        this.props.controls.playVideo()
    },
    nextTrack() {
        this.props.nextTrack()
    },
    render() {
        let controls = this.props.controls
        if (controls) {
            let duration = controls.getDuration()
            return (
                <div id="HUD" className="ui raised inverted segment">
                        <div id="hudcontainer">
                        <div id="MediaControls">
                            <i className="big backward icon" onClick={controls.prevTrack}></i>
                            <i className="big play icon" onClick={this.playTrack}></i>
                            <i className="big stop icon" onClick={this.stopTrack}></i>
                            <i className="big forward icon" onClick={this.nextTrack}></i>
                        </div>

                        <p>
                            Now Playing: {this.props.currentTrack.title}
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
    currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    nextTrack: bindActionCreators(nextTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaControls)
