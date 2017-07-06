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
var MediaPlayer = React.createClass({
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
    },
    onProgress(progress) {
      // We only want to update time slider if we are not currently seeking
      if (!this.props.nowPlaying.isSeeking) {
        this.props.updateProgess(progress)
      }
    },
    render() {
        const {
          url, volume, loaded, duration,
          playbackRate
      } = this.props.options

        let nowPlaying = this.props.nowPlaying
        if (this.props.queue.length > 0 && this.props.nowPlaying == null) {
            this.props.startPlayer(this.props.queue[0])

            if (this.props.controls == null)  {
                console.log('yo');
                this.props.setControls({
                    player: 'hey'
                })
                $('iframe').on('click', (e)=> {
                    e.preventDefault()
                })
            }
        }

        if (nowPlaying) {
            const played = this.props.nowPlaying.played
            let component = this
            return (
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
            )
        } else {
            return (
                <div></div>
            )
        }
    }
})

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
