// Dependencies
import React from 'react'
import $ from 'jquery';
import _ from 'lodash'
import {Redirect, BrowserRouter as Router} from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

const formStyle = {
    width: "100%",
    padding: "0"
}

const searchEngines = [
  {
    key: 'soundcloud',
    text: 'Soundcloud',
    value: 'soundcloud',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'youtube',
    text: 'Youtube',
    value: 'youtube',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
]

class SearchBox extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        query: null,
        engine: 'youtube'
      }

      this.switchEngine = this.switchEngine.bind(this)
      this.liveSearch = this.liveSearch.bind(this)
      this.searchQuery = this.searchQuery.bind(this)
      this.soundcloudSearch = this.soundcloudSearch.bind(this)
      this.youtubeSearch = this.youtubeSearch.bind(this)
    }

    componentDidMount() {
      this.SearchBox.focus()
    }

    switchEngine(e) {
      this.setState({ engine: e.target.textContent.toLowerCase() })
    }

    liveSearch() {
        if ($(this.SearchBox).val().length > 1) {
            this.searchQuery();
        } else {
            if ($('iframe') && this.props.nowPlaying && this.props.nowPlaying.platform === 'youtube') {
                this.searchQuery('getRelated')
            }
        }
    }

    searchQuery(e) {
        let component = this
        let query = $(this.SearchBox).val()
        let type;
        if (e === 'getRelated') {
            type = e
            query = this.props.nowPlaying.id
        } else {
            type = 'findSong'
        }

        component.setState({query})
        // component.props.isLoading(true);
        switch (component.state.engine) {
            case 'soundcloud':
                component.soundcloudSearch(query, type)
                break
            case 'youtube':
                component.youtubeSearch(query, type)
                break
            default:
        }

        return (
            <Router>
              <Redirect push to="/search"/>
            </Router>
        )
    }

    soundcloudSearch(query, type) {
        let component = this
        let tracks;

        $.ajax({
            url: `/search/${query}/soundcloud`,
            crossDomain : true,
            dataType: 'json',
            success: function(data) {
                tracks = _.map(data, function(result) {
                    return {
                        id: result.id,
                        genre: result.genere,
                        url: result.permalink_url,
                        title: result.title,
                        thumbnail: result.artwork_url,
                        type: result.kind === 'track' ? 'video' : 'playlist',
                        platform: 'soundcloud'
                    }
                })
                component.setState({tracks});
                component.props.callback(tracks);
                // component.props.isLoading(false);
            }
        });
    }

    youtubeSearch(query, type) {
        let component = this
        let tracks;

        $.ajax({
            url: `/search/${query}/youtube`,
            data: { query, platform: 'youtube' },
            headers: {"Access-Control-Allow-Origin": "*"},
            crossDomain : true,
            dataType: 'json',
            success: function(data) {
              console.log(data);
              console.log(data.items);
                tracks = _.map(data.items, function(result) {
                    return {
                        id: result.id[`${result.id.kind.split('#')[1]}Id`],
                        url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
                        channelTitle: result.snippet.channelTitle,
                        title: result.snippet.title,
                        artist: result.snippet.title,
                        thumbnail: result.snippet.thumbnails.default.url,
                        type: result.id.kind.split('#')[1],
                        platform: 'youtube',
                    }
                })
                console.log(tracks);
                component.setState({tracks});
                if (component.props.callback) {
                    component.props.callback(tracks);
                }
                
                // component.props.isLoading(false);
            }
        });
    }

    render() {
        let query = this.state.query;

        return (
            <div style={ query ? {} : formStyle} className="ui form">
                <div className="field">
                    <div className="ui icon big input">
                        <input id="searchBox"
                        ref={(input) => { this.SearchBox = input; }}
                        type="text" placeholder="Search for a song..."
                        disabled={this.props.loading}></input>
                        <i className="search icon"></i>
                        <div className="ui button" onClick={this.liveSearch}>Search</div>
                        { this.props.showEngines ?
                          <Dropdown
                            placeholder='Select Engine'
                            selection
                            value={this.state.engine}
                            onChange={this.switchEngine}
                            options={searchEngines}
                          />
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  nowPlaying: state.nowPlaying,
  loading: state.loading
 })

export default connect(
  mapStateToProps
)(SearchBox)
