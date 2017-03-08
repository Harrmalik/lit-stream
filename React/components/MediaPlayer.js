import React from 'react'

var MediaPlayer = React.createClass({
    getInitialState() {
        return {
            id: ''
        }
    },
    nowPlaying(id) {
        this.setState({id})
    },
    render() {
        let component = this
        if (this.state.id) {
            return (
                <iframe
                    id={this.state.id}
                    type="text/html"
                    src={`http://www.youtube.com/embed/${this.state.id}?enablejsapi=1&origin=http://example.com`}
                    ></iframe>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
})

export default MediaPlayer
