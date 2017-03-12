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
            }
        };
    },
    nowPlaying(id) {
        this.setState({id})
    },
    _onReady(event) {
      // access to player in all event handlers via event.target
      //event.target.pauseVideo();
    },
    render() {

        let component = this
        if (this.state.id) {
            return (
                <YouTube
                  videoId={this.state.id}
                  opts={this.state.opts}/>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
})

export default MediaPlayer
