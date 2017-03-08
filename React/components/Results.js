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
                <div className="ui items">
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
        console.log($(`#${this.props.result.id}`));
    },
    render() {
        return (
            <div className="item">
              <div className="content">
                <a className="header" onClick={this.playSong}>{this.props.result.title}</a>
                <div className="meta">
                  <span><a onClick={this.loadYoutubeVideo}>{this.props.result.title}</a></span>
                </div>
                <div className="description">
                  {this.props.result.title}
                </div>
                <div className="ui divider"></div>
              </div>
            </div>
        )
    }
})

export default Results;
