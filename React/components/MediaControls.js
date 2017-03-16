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
        return (
            <div id="HUD" className="ui raised inverted segment">
                {MediaTray.state.queue[0] ?
                    <div>
                    <div id="MediaControls">
                        <i className="big backward icon" onClick={MediaTray.prevTrack}></i>
                        <i className="big play icon" onClick={MediaTray.playPlayer}></i>
                        <i className="big stop icon" onClick={MediaTray.stopPlayer}></i>
                        <i className="big forward icon" onClick={MediaTray.getNextTrack}></i>
                    </div>

                    <p>Now Playing: {MediaTray.state.queue[0].title}</p>
                    </div> :
                    ''
                }

            </div>
        )
    }
})

export default MediaControls
