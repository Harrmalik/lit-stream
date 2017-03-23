import React from 'react'
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
          this.setState({controls: event.target});
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
        if (this.state.id) {
            return (
                <YouTube
                  videoId={this.state.id}
                  id={this.state.id}
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

export default MediaPlayer
