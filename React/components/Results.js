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
        component.props.parent.props.addToQueue(this.props.result, false)
    },
    addToUpNext() {
        let component = this
        component.props.parent.props.addToQueue(this.props.result, true)
    },
    render() {
        return (
            <div className="item">
                <a className="ui tiny image">
                    <img src={this.props.result.thumbnail}></img>
                </a>
              <div className="content">
                <div className="description">
                    <h3 onClick={this.loadYoutubeVideo}>{this.props.result.title}</h3>
                </div>
                <div className="meta">
                    <i className="plus icon" onClick={this.loadYoutubeVideo}></i>
                    <i className="forward icon" onClick={this.addToUpNext}></i>
                </div>
                <div className="ui divider"></div>
              </div>
            </div>
        )
    }
})

export default Results;
