'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery';
import _ from 'lodash';
import { setQueue, nowPlaying } from '../actions'

// Components
import Track from '../components/Track'

class Library extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        library: []
      }

      this.getSongs = this.getSongs.bind(this)
      this.playAll = this.playAll.bind(this)
    }

    componentWillMount() {
        if (localStorage.getItem('library')) {
            this.setState({ library: JSON.parse(localStorage.getItem('library')) })
        }
    }

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
    }

    componentDidMount() {
        this.getSongs()
    }

    playAll() {
        this.props.nowPlaying(this.state.library[0])
        this.props.setQueue(this.state.library)
    }

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

                    <tbody id="tracks">
                    {_.map(this.state.library, (song, index) => {
                        return (
                            <Track
                                key={song.url}
                                track={song}
                                view={'library'}></Track>
                        )
                    })}
                    </tbody>
                </table>
                <button className="ui button basic" onClick={this.playAll}>Play All songs</button>
                <p id="libraryHUD">{this.state.library.length} songs</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  currentTrack: state.nowPlaying,
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
