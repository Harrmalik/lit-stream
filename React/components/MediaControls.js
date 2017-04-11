import React from 'react'

var MediaControls = React.createClass({
    getInitialState() {
        return {
            controls: ''
        }
    },
    render() {
        let MediaTray = this.props.parent
        let controls = this.props.controls
        let nowPlaying = this.props.nowPlaying
        return (
            <div id="HUD" className="ui raised inverted segment">
                    <div id="hudcontainer">
                    <div id="MediaControls">
                        <i className="big backward icon" onClick={MediaTray.prevTrack}></i>
                        <i className="big play icon" onClick={MediaTray.playPlayer}></i>
                        <i className="big stop icon" onClick={MediaTray.stopPlayer}></i>
                        <i className="big forward icon" onClick={MediaTray.getNextTrack}></i>
                        <i className="youtube play big icon"  onClick={MediaTray.toggleVideo}></i>
                        <i className="list layout big icon" onClick={MediaTray.toggleLibrary}></i>
                    </div>

                    <p>
                        Now Playing: {MediaTray.state.nowPlaying.title}
                    </p>
                    </div>

            </div>
        )
    }
})

// { nowPlaying.state.nowPlaying.duration ?
// <span>Duration {Math.floor(nowPlaying.state.nowPlaying.duration / 60) + '.' + (nowPlaying.state.nowPlaying.duration%60).toFixed(2)}</span> : '' }

export default MediaControls
