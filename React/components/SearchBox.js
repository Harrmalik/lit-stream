import React from 'react'
import _ from 'lodash'

var formStyle = {
    position: "absolute",
    top: "45%",
    width: "100%",
    padding: "1em",
    left: "0"
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
    youtubeSearch(query) {
        let component = this
        let tracks;

        $.ajax({
            url: `/api/findSong`,
            data: { query },
            crossDomain : true,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                tracks = _.map(data, function(result) {
                    return {
                        id: result.id.videoId,
                        title: result.snippet.title,
                        thumbnail: result.snippet.thumbnails.default.url
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
        e.preventDefault()
        component.setState({query})
        switch (component.state.engine) {
            case 'soundcloud':
                component.soundcloudSearch(query)
                break
            case 'youtube':
                component.youtubeSearch(query)
                break
        }
    },
    render() {
        let query = this.state.query;
        return (
            <form onSubmit={this.searchQuery} style={ query ? {} : formStyle} className="ui form">
                <div className="field">
                    <div className="ui icon big input">
                        <input
                        ref={(input) => { this.SearchBox = input; }}
                        type="text" placeholder="Search for a song..."></input>
                        <i className="search icon"></i>

                        <SearchEngine
                            parent={this}></SearchEngine>
                    </div>
                </div>
            </form>
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
