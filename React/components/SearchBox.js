import React from 'react'
import _ from 'lodash'
import {Link, Redirect, BrowserRouter as Router} from 'react-router-dom'

var formStyle = {
    width: "100%",
    padding: "0"
}

var SearchBox = React.createClass({
    getInitialState() {
        return {
            query: null,
            engine: 'youtube'
        }
    },
    componentDidMount() {
      this.SearchBox.focus()

    },
    soundcloudSearch(query) {
        console.log('soundcloud')
    },
    youtubeSearch(query, type) {
        let component = this
        let tracks;

        $.ajax({
            url: `/api/${type}`,
            data: { query },
            crossDomain : true,
            dataType: 'json',
            success: function(data) {
                tracks = _.map(data, function(result) {
                    return {
                        id: result.id.videoId ? result.id.videoId : result.id.playlistId,
                        title: result.snippet.title,
                        thumbnail: result.snippet.thumbnails.default.url,
                        type: result.id.videoId ? 'video' : 'playlist',
                        platform: 'youtube'
                    }
                })
                component.setState({tracks});
                component.props.callback(tracks);
            }
        });
    },
    searchQuery(e) {
        let component = this
        let query = $(this.SearchBox).val()
        let type;
        if (e == 'getRelated') {
            type = e
            query = $('iframe').attr('id')
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
    },
    liveSearch() {
        if ($(this.SearchBox).val()) {
            this.searchQuery();
        } else {
            if ($('iframe')) {
                this.searchQuery('getRelated')
            }
        }
    },
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
                    </div>
                </div>
            </div>
        )
    }
})

var SearchEngine = React.createClass({
    getInitialState() {
        return {
            engine: this.props.parent.state.engine
        }
    },
    componentDidMount() {
        $('.selection.dropdown')
          .dropdown()
        ;
    },
    changeSearchEngine(e) {
        this.props.parent.setState({
            engine: $(e.target).text().toLowerCase()
        })
    },
    render() {
        return (
            <div className="ui selection dropdown">
                <input type="hidden" name={this.state.engine}></input>
                <i className="dropdown icon"></i>
                <div className="default text">{this.state.engine}</div>

                <div className="menu">
                    <div className="item" data-value="1" onClick={this.changeSearchEngine}>Soundcloud</div>
                    <div className="item" data-value="0" onClick={this.changeSearchEngine}>Youtube</div>
                </div>
            </div>
        )
    }
})

export default SearchBox
