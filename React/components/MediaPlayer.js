import React from 'react'
import YouTube from '../../node_modules/react-youtube/dist/YouTube'

var MediaPlayer = React.createClass({
    getInitialState() {
        return {
            id: '',
            opts: {
                height: '300',
                width: '300',
                playerVars: { // https://developers.google.com/youtube/player_parameters
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
      // access to player in all event handlers via event.target
      event.target.playVideo();
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
    getNextTrack(event) {
        console.log(event)
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
