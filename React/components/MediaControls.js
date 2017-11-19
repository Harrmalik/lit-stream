'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nextTrack, prevTrack, shuffle, repeat, playTrack, stopTrack, updateProgess, isSeeking, setQueue } from '../actions'

class MediaControls extends React.Component {
    constructor(props) {
        super(props)

        this.prevTrack = this.prevTrack.bind(this)
        this.playTrack = this.playTrack.bind(this)
        this.stopTrack = this.stopTrack.bind(this)
        this.nextTrack = this.nextTrack.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.repeat = this.repeat.bind(this)
        this.onSeekChange = this.onSeekChange.bind(this)
        this.onSeekMouseUp = this.onSeekMouseUp.bind(this)
        this.onSeekMouseDown = this.onSeekMouseDown.bind(this)
    }

    prevTrack() {
        if (this.props.controls.getCurrentTime() > 5) {
                this.props.controls.seekTo(0)
        } else {
            this.props.prevTrack(this.props.nowPlaying)
        }
    }

    playTrack() {
        this.props.playTrack()
    }

    stopTrack() {
        this.props.stopTrack()
    }

    nextTrack() {
        if (this.props.options.shuffle) {
            let numSongs = this.props.queue.length
            this.props.nowPlaying.nextIndex= Math.floor(Math.random() * numSongs)
            this.props.nextTrack(this.props.nowPlaying)
        } else {
            this.props.nextTrack(this.props.nowPlaying)
        }
    }

    shuffle() {
        // this.props.shuffle()
        let newQueue = [],
            queue = this.props.queue

        _.remove(queue, (track) => {
            return track.id == this.props.nowPlaying.id
        })

        this.props.setQueue([this.props.nowPlaying, ..._.shuffle(queue)])
    }

    repeat() {
        this.props.repeat()
    }

    onSeekChange(e) {
        this.props.updateProgess({ played: parseFloat(e.target.value), playedSeconds: this.props.nowPlaying.playedSeconds })
    }

    onSeekMouseUp(e) {
        this.props.isSeeking()
        this.props.controls.player.seekTo(parseFloat(e.target.value))
    }

    onSeekMouseDown() {
        this.props.isSeeking()
    }

    render() {
        let controls = this.props.controls,
            options = this.props.options,
            nowPlaying = this.props.nowPlaying

        if (controls) {
            let duration = nowPlaying.duration
            return (
                <div id="HUD" className="ui raised inverted segment">
                    <div id="hudcontainer">
                        <div id="MediaControls">
                            <i className={options.shuffle ? 'step random icon blue' : 'step random icon'} onClick={this.shuffle}></i>
                            <i className="step backward icon" onClick={this.prevTrack}></i>
                            { !nowPlaying.playing ?
                              <i className="big play icon" onClick={this.playTrack}></i> :
                              <i className="big stop icon" onClick={this.stopTrack}></i>
                            }
                            <i className="step forward icon" onClick={this.nextTrack}></i>
                            <i className={options.repeat ? 'step repeat icon blue' : 'step repeat icon'} onClick={this.repeat}></i>
                            <i className="list icon" onClick={ () => { $('#queuePage').transition('slide left') } }></i>
                        </div>

                        <marquee>{this.props.nowPlaying.title}</marquee>

                        <p>
                          <span>{nowPlaying.playedSeconds ? Math.floor(nowPlaying.playedSeconds / 60) + '.' + (nowPlaying.playedSeconds %60).toFixed(0) : 0}</span>
                          <input
                            type='range' min={0} max={1} step='any'
                            value={nowPlaying.played}
                            onMouseDown={this.onSeekMouseDown}
                            onChange={this.onSeekChange}
                            onMouseUp={this.onSeekMouseUp}></input>
                            <span>{duration ? Math.floor(duration / 60) + '.' + (duration %60).toFixed(0) : 0}</span>
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
}

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
    repeat: bindActionCreators(repeat, dispatch),
    playTrack: bindActionCreators(playTrack, dispatch),
    stopTrack: bindActionCreators(stopTrack, dispatch),
    updateProgess: bindActionCreators(updateProgess, dispatch),
    isSeeking: bindActionCreators(isSeeking, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaControls)
