'use strict'

// Dependencies
import React from 'react'

class ChannelPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          playlists: []
        }
    }

    componentDidMount() {
        let component = this

        $.ajax({
          url: '/api/getChannelPlaylists?query=UCSa8IUd1uEjlREMa21I3ZPQ'
        }).done((playlists) => {
          component.setState({ playlists })
        })
    }

    render() {
        return (
            <div className="page">
              {this.state.playlists.length > 0 ? <h2 className="ui header">{this.state.playlists[0].snippet.channelTitle}</h2> : null}
              <div className="ui three column grid">
                {_.map(this.state.playlists, (playlist) => {
                    return (
                        <div className="column" key={playlist.id}>
                          <div className="ui fluid link card">
                            <div className="image">
                              <img src={playlist.snippet.thumbnails.standard.url}/>
                            </div>
                            <div className="content">
                              <a className="header">{playlist.snippet.title}</a>
                              <div className="meta">{playlist.snippet.description}</div>
                            </div>
                          </div>
                        </div>
                    )
                })}
              </div>
            </div>
        )
    }
}

export default ChannelPage
