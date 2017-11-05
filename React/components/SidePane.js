'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { cc, setQueue, nowPlaying, removeTrack, addPlaylist } from '../actions'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'
import MediaPlayer from '../components/MediaPlayer'
import { Dropdown, Input } from 'semantic-ui-react'

class AddPlaylistModal extends React.Component {
  constructor(props){
    super()

    this.addPlaylist = this.addPlaylist.bind(this)
  }

  addPlaylist() {
    let playlists = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [],
        playlist = {
            name: this.playlistName.inputRef.value,
            description: this.description.inputRef.value,
            tracks: []
        }
    // TODO: make sure playlist doesn't already exist
    // TODO: make sure playlistname is included else throw error

    this.props.addPlaylist(playlist)
    playlists.push(playlist)

    this.playlistName.inputRef.value = ' '
    this.description.inputRef.value = ' '

    localStorage.setItem('playlists', JSON.stringify(playlists))
  }

  render() {
    return (
      <Dropdown text='Add Playlist' search icon='add' floating labeled button className='icon green'>
        <Dropdown.Menu>
          <Dropdown.Header content='Plalist Name' />
          <Input name='playlistName' ref={input =>  this.playlistName = input} />
          <Dropdown.Header content='Description' />
          <Input name='description' ref={input =>  this.description = input} />
          <div className="item">
            <div className="ui button fluid" onClick={this.addPlaylist}>Add</div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

class SidePane extends React.Component {
    componentDidMount() {
        $('#SidePane a').on('click', (e) =>{
            $('#SidePane h3').removeClass('active')
            $(e.target).parent().addClass('active')
        })
    }

    render() {
      let currentPage = this.props.match.params.page,
          playlists = this.props.playlists

        return (
            <section id="SidePane" className="droppable">
                <Link to="/search"><SearchBox></SearchBox></Link>
                <div className="ui secondary vertical pointing menu" style={{width: "100%"}}>
                    <h3 className="item ui">
                      <Link to="/">Home</Link>
                    </h3>
                  <h3 className="item ui">
                    <Link to="/search">Search</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/player">Player</Link>
                  </h3>
                  <div className="ui divider"></div>
                  <h3 className="item ui">
                    <Link to="/library">Library</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/queue">Queue</Link>
                  </h3>
                  <h3 className="item ui">
                    <Link to="/history">History</Link>
                  </h3>
                  <div className="ui divider"></div>
                  <h3 className="item">Playlists</h3>
                  { _.map(playlists, playlist => {
                    return (
                      <h3  key={playlist.name} className="item ui">
                        <Link to={`/playlist/${playlist.name.toLowerCase().replace(/\s/g, '')}`}>{playlist.name}</Link>
                      </h3>
                    )
                  }) }
                  <AddPlaylistModal addPlaylist={this.props.addPlaylist}/>

                </div>
                <MediaPlayer></MediaPlayer>
            </section>
        )
    }
}

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying,
  playlists: state.playlists
})

const mapDispatchToProps = dispatch => ({
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    removeTrack: bindActionCreators(removeTrack, dispatch),
    addPlaylist: bindActionCreators(addPlaylist, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidePane)
