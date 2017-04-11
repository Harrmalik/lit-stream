import React from 'react'

let Library = React.createClass({
    getInitialState() {
        return {
            playlist: '',
            songs: [{
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            },
            {
                title: 'ride',
                artist: 'twenty one pilots',
                liked: false,
                created: 'nwn'
            }]
        }
    },
    getSongs() {
        $.ajax({
            url: '',
            data: {

            }
        }).success((songs) => {
            // TODO: get songs and add them to state
        }).fail((message) => {
            // TODO: handle failure to load tracks
        })
    },
    componentDidMount() {
        this.getSongs()
    },
    render() {
        return (
            <div id="libraryContainer">
                <table id="library" className="ui table striped compact">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Liked</th>
                            <th>Date added</th>
                            <th>rating</th>
                        </tr>
                    </thead>

                    <tbody>
                    {_.map(this.state.songs, (song, index) => {
                        return (
                            <tr>
                                <td>
                                    <div className="ui checkbox">
                                        <input type="checkbox"></input>
                                        <label></label>
                                    </div>
                                </td>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.liked}</td>
                                <td>{song.created}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <p id="libraryHUD">{this.state.songs.length} songs</p>
            </div>
        )
    }
})

export default Library
