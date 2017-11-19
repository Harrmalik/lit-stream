'use strict'

// Dependencies
import React from 'react'
import _ from 'lodash'
import {Link, Redirect, BrowserRouter as Router} from 'react-router-dom'
import { connect } from 'react-redux'

var formStyle = {
    width: "100%",
    padding: "0"
}

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

    switchEngine(engine) {
      this.setState({ engine })
    }

    liveSearch() {
        if ($(this.SearchBox).val().length > 1) {
            this.searchQuery();
        } else {
            if ($('iframe') && this.props.nowPlaying && this.props.nowPlaying.platform == 'youtube') {
                this.searchQuery('getRelated')
            }
        }
    }

    searchQuery(e) {
        let component = this
        let query = $(this.SearchBox).val()
        let type;
        if (e == 'getRelated') {
            type = e
            query = this.props.nowPlaying.id
        } else {
            type = 'findSong'
        }

        component.setState({query})
        switch (component.state.engine) {
            case 'soundcloud':
                component.soundcloudSearch(query, type)
                break
            case 'youtube':
                component.youtubeSearch(query, type)
                break
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
            url: `/api/${type}`,
            data: { query, platform: 'soundcloud' },
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
                        type: result.kind == 'track' ? 'video' : 'playlist',
                        platform: 'soundcloud'
                    }
                })
                component.setState({tracks});
                component.props.callback(tracks);
            }
        });
    }

    youtubeSearch(query, type) {
        let component = this
        let tracks;

        $.ajax({
            url: `/api/${type}`,
            data: { query, platform: 'youtube' },
            crossDomain : true,
            dataType: 'json',
            success: function(data) {
                tracks = _.map(data, function(result) {
                    return {
                        id: result.id[`${result.id.kind.split('#')[1]}Id`],
                        url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
                        channelTitle: result.snippet.channelTitle,
                        title: result.snippet.title,
                        thumbnail: result.snippet.thumbnails.default.url,
                        type: result.id.kind.split('#')[1],
                        platform: 'youtube',

                    }
                })
                component.setState({tracks});
                component.props.callback(tracks);
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
                        onChange={this.liveSearch}></input>
                        <i className="search icon"></i>
                        { this.props.showEngines ?
                            <SearchEngine engine={this.state.engine} switchEngine={this.switchEngine} />
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

class SearchEngine extends React.Component {
    constructor(props) {
      super(props)

      this.changeSearchEngine = this.changeSearchEngine.bind(this)
    }

    componentDidMount() {
        $('.selection.dropdown')
          .dropdown()
        ;
    }

    changeSearchEngine(e) {
        this.props.switchEngine(e.target.id)
    }

    render() {
        return (
            <div className="ui selection dropdown">
                <input type="hidden" name={this.props.engine}></input>
                <i className="dropdown icon"></i>
                <div className="default text">{this.props.engine}</div>

                <div className="menu">
                    <div id="soundcloud" className="item" data-value="1" onClick={this.changeSearchEngine}>Soundcloud</div>
                    <div id="youtube" className="item" data-value="0" onClick={this.changeSearchEngine}>Youtube</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  nowPlaying: state.nowPlaying,
 })

export default connect(
  mapStateToProps
)(SearchBox)
