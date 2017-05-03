import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue } from '../actions'

var Results = React.createClass({
    updateQueue(newTrack, upNext) {
        this.props.updateQueue(newTrack, upNext)
    },
    render() {
        let data = this.props.data[0]
        let component = this
            return (
                <div className="ui items" id="Results">
                    {_.map(data, function(result) {
                        return (
                            <Result
                                key={result.id}
                                result={result}
                                callback={component.updateQueue}></Result>
                        )
                    })}
                </div>
            )

    }
});

var Result = React.createClass({
    add() {
        this.props.callback(this.props.result, false)
    },
    upNext() {
        this.props.callback(this.props.result, true)
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
                </div>
                <div className="ui divider"></div>
              </div>
            </div>
        )
    }
})

const mapStateToProps = state => ({
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
