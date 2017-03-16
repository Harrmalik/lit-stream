import React from 'react'
import _ from 'lodash'
import MediaPlayer from './MediaPlayer'

var Results = React.createClass({
    render() {
        let data = this.props.data[0]
        let component = this
        if (!data) {
            return (
                <div></div>
            )
        } else {
            return (
                <div className="ui items" id="Results">
                    {_.map(data, function(result) {
                        return (
                            <Result
                                key={result.id}
                                result={result}
                                parent={component}></Result>
                        )
                    })}
                </div>
            )
        }
    }
});

var Result = React.createClass({
    getInitialState() {
        return {
            id: this.props.result.id,
            title: this.props.result.title,
            playing: false
        }
    },
    loadYoutubeVideo() {
        let component = this
        component.props.parent.props.addToQueue(this.props.result)
    },
    playSong(e) {

    },
    render() {
        return (
            <div className="item" onClick={this.loadYoutubeVideo}>
                <a className="ui tiny image">
                    <img src={this.props.result.thumbnail}></img>
                </a>
              <div className="content">
                <div className="description">
                    <h3>{this.props.result.title}</h3>
                </div>
                <div className="meta">
                    <h3>

                    </h3>
                </div>
                <div className="ui divider"></div>
              </div>
            </div>
        )
    }
})

export default Results;
