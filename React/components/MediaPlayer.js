import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { nowPlaying } from '../actions'
import YouTube from '../../node_modules/react-youtube/dist/YouTube'

var MediaPlayer = React.createClass({
    getInitialState() {
        return {
            id: '',
            nowPlaying: {},
            opts: {
                height: '300',
                width: '300',
                playerVars: {
                    autoplay: 1
                }
            },
            controls: ''
        };
    },
    nowPlaying(id) {
        this.setState({id})
    },
    playTrack(event) {
      event.target.playVideo()
      if (this.state.controls == '')  {
          $('#Overlay').show()
          this.setState({controls: event.target});
          $('iframe').on('click', (e)=> {
              e.preventDefault()
              console.log(e)
              console.log(this)
          })
      }
    },
    stopPlayer() {
        this.state.controls.pauseVideo();
    },
    playPlayer() {
        this.state.controls.playVideo();
    },
    getDuration() {
        this.state.controls.getDuration();
        console.log(this.state.controls.getDuration());
        console.log(this.state.controls.getPlaylist());
        console.log(this.state.controls.getVolume());
    },
    setNowPlaying(event) {
        let nowPlaying = {
            id: this.state.id,
            duration: this.state.controls.getDuration()
        }
        // console.log('ready')
        // console.log(this.state.controls.getDuration())
        // console.log(this.state.nowPlaying)
        this.setState({nowPlaying})
    },
    getNextTrack(event) {
        this.props.parent.getNextTrack(this.state.id)
    },
    render() {
        let component = this
        let nowPlaying = this.props.nowPlaying
        if (nowPlaying) {
            return (
                <YouTube
                  videoId={nowPlaying.id}
                  id={nowPlaying.id}
                  opts={this.state.opts}
                  onReady={this.playTrack}
                  onStateChange={this.setNowPlaying}
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
  nowPlaying: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayer)
