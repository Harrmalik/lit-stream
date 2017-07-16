import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue } from '../actions'

var Results = React.createClass({
    updateQueue(newTrack, upNext, nowPlaying) {
        newTrack.playing = true
        newTrack.played = 0
        newTrack.isSeeking = false
        this.props.updateQueue(newTrack, upNext, nowPlaying)
    },
    render() {
        let data = this.props.data[0]
        let component = this
        return (
            <div className="ui divided items" id="Results">
                {_.map(data, function(result) {
                    return (
                        <Result
                            key={result.id}
                            result={result}
                            callback={component.updateQueue}
                            nowPlaying={component.props.nowPlaying}></Result>
                    )
                })}
            </div>
        )
    }
});

var Result = React.createClass({
    add() {
        this.props.callback(this.props.result, false, this.props.nowPlaying)
    },
    upNext() {
        this.props.callback(this.props.result, true, this.props.nowPlaying)
    },
    renderPlatform() {
        let color,platform

        switch (this.props.result.platform) {
            case 'youtube':
                color = 'red'
                break;
            case 'soundcloud':
                color = 'orange'
                break;

        }
        return (

             <a className={`ui ${color} label`}>{this.props.result.platform}</a>
        )
    },
    render() {
        return (
            <div className="item">
                <a className="ui tiny image">
                    <img src={this.props.result.thumbnail}></img>
                </a>
              <div className="content">
                <div className="description">
                    <h3 onClick={this.add}>{this.props.result.title}</h3>
                </div>
                <div className="meta">
                    <i className="plus icon" onClick={this.add}></i>
                    <i className="forward icon" onClick={this.upNext}></i>
                    <i className="ellipsis horizontal icon"></i>
                    {this.renderPlatform()}
                </div>
              </div>
            </div>
        )
    }
})

const mapStateToProps = state => ({
  queue: state.queue,
  nowPlaying: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
