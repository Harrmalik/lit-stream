import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, setQueue, nowPlaying, removeTrack } from '../actions'

let Library = React.createClass({
    getInitialState() {
        return {
            library: []
        }

    },
    componentWillMount() {
        if (localStorage.getItem('library')) {
            this.setState({ library: JSON.parse(localStorage.getItem('library')) })
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
    playAll() {
        this.props.setQueue(this.state.library)
        this.props.nowPlaying(this.state.library[0])
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
                            <th>Platform</th>
                        </tr>
                    </thead>

                    <tbody>
                    {_.map(this.state.library, (song, index) => {
                        return (
                            <Track
                                key={song.url}
                                track={song}
                                parent={this}></Track>
                        )
                    })}
                    </tbody>
                </table>
                <button className="ui button basic" onClick={this.playAll}>Play All songs</button>
                <p id="libraryHUD">{this.state.library.length} songs</p>
            </div>
        )
    }
})

let Track = React.createClass({
    startThis() {
        let parent = this.props.parent.props
        let track = this.props.track
        track.no
        parent.updateQueue(this.props.track, false, this.props.parent.currentTrack)
        if (parent.queue.length > 0) {
            parent.nowPlaying(this.props.track)
        }
    },
    render() {
        let track = this.props.track
        return (
            <tr key={track.url} onClick={this.startThis}>
                <td>
                    <div className="ui checkbox">
                        <input type="checkbox"></input>
                        <label></label>
                    </div>
                </td>
                <td>{track.title}</td>
                <td>{track.url}</td>
                <td>{track.liked ? <i className="heart icon"></i> : <i className="empty heart icon"></i>}</td>
                <td>July 4th</td>
                <td>{track.platform}</td>
            </tr>
        )
    }
})


const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    updateQueue: bindActionCreators(updateQueue, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
