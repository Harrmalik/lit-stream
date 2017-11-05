'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setControls, nextTrack, nowPlaying, updateProgess, setDuration } from '../actions'
import YouTube from '../../node_modules/react-youtube/dist/YouTube'

import ReactPlayer from 'react-player'

var soundcloudConfig = {
    clientId: 'ac896ad5490da37d6c8064572d06d7bb',
    showArtwork: true
}

class MediaPlayer extends React.Component {
    constructor(props) {
        super(props)

        this.getNextTrack = this.getNextTrack.bind(this)
        this.onProgress = this.onProgress.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let nowPlaying = this.props.nowPlaying
        if (nextProps.queue.length == 1 && nextProps.nowPlaying == null)
            this.props.startPlayer(nextProps.queue[0])

        if (this.props.controls == null && this.player) {
            this.props.setControls({
                player: this.player
            })
            $('iframe').on('click', (e)=> {
                e.preventDefault()
            })
        }
    }

    getNextTrack(event) {
        if (this.props.options.repeat) {
            event.target.playVideo()
        } else {
            if (this.props.options.shuffle) {
                let numSongs = this.props.queue.length
                this.props.nowPlaying.nextIndex= Math.floor(Math.random() * numSongs)
                this.props.nextTrack(this.props.nowPlaying)
            } else {
                this.props.nextTrack(this.props.nowPlaying)
            }
        }
    }

    onProgress(progress) {
      // We only want to update time slider if we are not currently seeking
      if (!this.props.nowPlaying.isSeeking) {
        this.props.updateProgess(progress)
      }
    }

    render() {
        const {
          url, volume, loaded, duration,
          playbackRate
      } = this.props.options

        let nowPlaying = this.props.nowPlaying

        if (nowPlaying) {
            const played = this.props.nowPlaying.played
            let component = this
            return (
              <div id="media-player">
                <ReactPlayer
                    soundcloudConfig={soundcloudConfig}
                    url={this.props.nowPlaying.url}
                    ref={player =>  this.player = player}
                    playing={nowPlaying.playing}
                    playbackRate={playbackRate}
                    volume={volume}
                    width='100%'
                    height='300px'
                    controls
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onBuffer={() => console.log('onBuffer')}
                    onEnded={this.getNextTrack}
                    onError={e => console.log('onError', e)}
                    onProgress={this.onProgress}
                    onDuration={duration => this.props.setDuration( duration )} />
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

const mapStateToProps = state => ({
  nowPlaying: state.nowPlaying,
  controls: state.controls,
  options: state.options,
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    setControls: bindActionCreators(setControls, dispatch),
    startPlayer: bindActionCreators(nowPlaying, dispatch),
    nextTrack: bindActionCreators(nextTrack, dispatch),
    updateProgess: bindActionCreators(updateProgess, dispatch),
    setDuration: bindActionCreators(setDuration, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer)

// <YouTube
//   videoId={nowPlaying.id}
//   id={nowPlaying.id}
//   opts={this.state.opts}
//   onReady={this.playTrack}
//   onEnd={this.getNextTrack}/>
