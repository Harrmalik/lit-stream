'use strict'

// Dependencies
import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue } from '../actions'

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.updateQueue = this.updateQueue.bind(this)
  }
  updateQueue(newTrack, upNext) {
      newTrack.playing = true
      newTrack.played = 0
      newTrack.isSeeking = false
      this.props.updateQueue(newTrack, upNext)
  }

  render() {
      let data = this.props.data,
        component = this

      return (
          <div className="ui divided items" id="Results">
              {_.map(data, (result) => {
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
}

class Result extends React.Component {
  constructor(props) {
    super(props)

    this.add = this.add.bind(this)
    this.upNext = this.add.bind(this)
    this.renderPlatform = this.renderPlatform.bind(this)
  }

  add() {
      this.props.callback(this.props.result, false)
  }

  upNext() {
      this.props.callback(this.props.result, true)
  }

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
  }

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
}

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
