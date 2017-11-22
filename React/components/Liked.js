'use strict'

// Dependencies
import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../actions'
import moment from 'moment'

class Liked extends React.Component {
    constructor(props) {
        super(props)

        let track = _.find(props.liked, (t) => { return t.id == props.track.id })

        this.state = {
            liked: track ? true : false,
            style: track
        }

        this.toggleLike = this.toggleLike.bind(this)
    }

    toggleLike() {
        let track = this.props.track,
            title = track.title.replace(/([f][t]\.|[F][t]\.)/g, '').split('-'),
            liked = this.props.liked

        if (this.state.liked) {
            let index = _.findIndex(liked, (t) => { return t.id == track.id })
            liked.splice(index,1)
            this.props.removeLike(track)
        } else {
          track = {
            ...this.props.track,
            track: title[1],
            artist: title[0].trim(),
            liked: false,
            created: moment(),
            isSeeking: false,
            played: 0,
            playing: true
          }
          this.props.addLike(track)
          liked.push(track)
        }
        localStorage.setItem('liked', JSON.stringify(liked))
        this.setState({ liked: !this.state.liked })
    }

    render() {
        return <div className="item" onClick={this.toggleLike}><i className={this.state.liked ? "heart pink icon" : "heart empty icon"}></i></div>
    }
}

const mapStateToProps = state => ({
  liked: state.liked
})

const mapDispatchToProps = dispatch => ({
  addLike: bindActionCreators(addLike, dispatch),
  removeLike: bindActionCreators(removeLike, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Liked)
