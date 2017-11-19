'use strict'

// Dependencies
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, setQueue, nowPlaying, removeTrack } from '../actions'

class HistoryPage extends React.Component {
    componentDidMount() {
        let component = this
        $('#history').sortable({
          update: function( event, ui ) {
              let history = component.props.history
              history.splice(history.findIndex(track=> track.id == ui.item[0].id), 1)
              history.splice($('#history').find(`#${ui.item[0].id}`).index(), 0, {
                  id: ui.item[0].id,
                  title: $('#history').find(`#${ui.item[0].id}`).data("title"),
                  thumbnail: $('#history').find(`#${ui.item[0].id}`).data("thumbnail")
              })
              component.props.sethistory(history)
          }
        });
    }

    remove(index) {
        let component = this
        let history = component.state.history
        history.splice(index, 1)
        component.setState({history})
        if (index == 0) {
            component.getNextTrack();
        }
    }

    render() {
        let component = this
        console.log(this.props.history);
        return (
            <div className="page">
                <div className="header">History</div>
                <div id="history" className="ui items">
                    {_.map(this.props.history, (track, index) => {
                        return (
                            <Track
                                key={track.id + (Math.floor(Math.random() * 100000) + 1)}
                                track={track}
                                parent={this}
                                position={index}></Track>
                        )
                    })}
                </div>
            </div>
        )
    }
}

class Track extends React.Component {
    startThis() {
        this.props.parent.props.nowPlaying(this.props.track)
    }

    removeTrack() {
        this.props.parent.props.removeTrack(this.props.track)
    }

    render() {
        let track = this.props.track
        return (
            <div className="item track" id={this.props.track.id} data-title={this.props.track.title} data-thumbnail={this.props.track.thumbnail}>
                <div className="content">
                    <i className="remove icon" onClick={this.removeTrack}></i>
                    {this.props.parent.props.currentTrack.id == this.props.track.id ?
                        <i className="volume up icon"></i>
                    : <a className="ui blue circular label">{this.props.position + 1}</a>}
                    <a className={this.props.parent.props.currentTrack.id == this.props.track.id ?
                    'ui blue header' : 'header'} onClick={this.startThis}>{this.props.track.title}</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  history: state.history,
  currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch),
    setQueue: bindActionCreators(setQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    removeTrack: bindActionCreators(removeTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPage)
