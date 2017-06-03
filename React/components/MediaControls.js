import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nextTrack, prevTrack, shuffle, repeat } from '../actions'

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
        if (this.props.options.shuffle) {
            let numSongs = this.props.queue.length
            this.props.nowPlaying.nextIndex= Math.floor(Math.random() * numSongs)
            this.props.nextTrack(this.props.nowPlaying)
        } else {
            this.props.nextTrack(this.props.nowPlaying)
        }
    },
    shuffle() {
        this.props.shuffle()
    },
    repeat() {
        this.props.repeat()
    },
    render() {
        let controls = this.props.controls,
            options = this.props.options

        if (controls) {
            console.log(options);
            let duration = controls.getDuration()
            return (
                <div id="HUD" className="ui raised inverted segment">
                        <div id="hudcontainer">
                        <div id="MediaControls">
                            <i className={options.shuffle ? 'step random icon blue' : 'step random icon'} onClick={this.shuffle}></i>
                            <i className="step backward icon" onClick={this.prevTrack}></i>
                            <i className="big play icon" onClick={this.playTrack}></i>
                            <i className="big stop icon" onClick={this.stopTrack}></i>
                            <i className="step forward icon" onClick={this.nextTrack}></i>
                            <i className={options.repeat ? 'step repeat icon blue' : 'step repeat icon'} onClick={this.repeat}></i>
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
    options: state.options,
    controls: state.controls,
    nowPlaying: state.nowPlaying,
    queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    nextTrack: bindActionCreators(nextTrack, dispatch),
    prevTrack: bindActionCreators(prevTrack, dispatch),
    shuffle: bindActionCreators(shuffle, dispatch),
    repeat: bindActionCreators(repeat, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaControls)
