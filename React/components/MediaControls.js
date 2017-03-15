import React from 'react'

var MediaControls = React.createClass({
    getInitialState() {
        return {
            controls: ''
        }
    },
    render() {
        return (
            <div id="HUD" className="ui raised inverted segment">
                <div id="MediaControls">
                    <i className="big backward icon" onClick={this.prevTrack}></i>
                    <i className="big play icon" onClick={this.playPlayer}></i>
                    <i className="big stop icon" onClick={this.stopPlayer}></i>
                    <i className="big forward icon" onClick={this.getNextTrack}></i>
                </div>
            </div>
        )
    }
})

export default MediaControls
