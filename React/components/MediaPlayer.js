import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setControls, nextTrack, nowPlaying } from '../actions'
import YouTube from '../../node_modules/react-youtube/dist/YouTube'

var MediaPlayer = React.createClass({
    getInitialState() {
        return {
            opts: {
                height: '300',
                width: '300',
                playerVars: {
                    autoplay: 1
                }
            }
        };
    },
    playTrack(event) {
      event.target.playVideo()
      if (this.props.controls == null)  {
          this.props.setControls(event.target)
          $('iframe').on('click', (e)=> {
              e.preventDefault()
          })
      }
    },
    getNextTrack(event) {
        this.props.nextTrack(this.props.nowPlaying)
    },
    render() {
        let nowPlaying = this.props.nowPlaying
        if (this.props.queue.length > 0 && this.props.nowPlaying == null) {
            this.props.startPlayer(this.props.queue[0])
        }
        if (nowPlaying) {
            return (
                <YouTube
                  videoId={nowPlaying.id}
                  id={nowPlaying.id}
                  opts={this.state.opts}
                  onReady={this.playTrack}
                  onEnd={this.getNextTrack}/>

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
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    setControls: bindActionCreators(setControls, dispatch),
    // TODO: remove nowplaying from media player
    startPlayer: bindActionCreators(nowPlaying, dispatch),
    nextTrack: bindActionCreators(nextTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer)
