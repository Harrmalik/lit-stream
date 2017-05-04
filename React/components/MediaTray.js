import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateQueue, nowPlaying, nextTrack } from '../actions'
import MediaPlayer from './MediaPlayer'

let MediaTray = React.createClass({
    getNextTrack(e) {
        this.props.nextTrack(this.props.currentTrack.index)
        // let component = this
        // let queue = component.state.queue
        // let history = component.state.history
        // let options = component.state.options
        // let nowPlaying = component.state.nowPlaying
        // let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)
        // let query = queue[prevIndex].id
        // if (options.repeat) {
        //     component.playPlayer()
        // } else {
        //     history.push(queue[prevIndex])
        //     queue.splice(prevIndex,1)
        //
        //     let index = options.shuffle ? Math.floor(Math.random() * ((queue.length-0)+0) + 0) : 0
        //     component.setState({queue})
        //
        //     if (queue.length >= 1) {
        //         component.mediaPlayer.nowPlaying(queue[index].id)
        //         scroller(`Lit Stream: ` + queue[index].title, 'document')
        //         this.playPlayer()
        //         component.setState({nowPlaying: queue[index]})
        //     } else {
        //         // TODO: No songs left

        //     }
        // }
    },
    prevTrack() {
        let component = this
        let queue = component.state.queue
        let history = component.state.history
        let nowPlaying = component.state.nowPlaying
        let prevIndex = queue.findIndex(track => track.id == nowPlaying.id)
        let query = queue[prevIndex].id
        let lastTrack =  history[history.length -1]
        history.push(queue[prevIndex])
        queue.splice(prevIndex,1)
        queue.splice(0,0, lastTrack)
        component.setState({queue})
        component.mediaPlayer.nowPlaying(lastTrack.id)
        component.setState({nowPlaying: queue[0]})
    },
    playNow(index, track) {
        let component = this
        let queue = component.state.queue
        let history = component.state.history
        let nowPlaying = component.state.nowPlaying
        let lastTrack =  history[history.length -1]
        let prevIndex = queue.length > 1 ? queue.findIndex(track => track.id == nowPlaying.id) : history.findIndex(track => track.id == lastTrack.id)

        history.push(queue[0])
        queue.splice(prevIndex,1)
        if (queue.length == 0) {
            queue.splice(0,0, lastTrack)
        }

        component.setState({
            queue,
            nowPlaying: track
        })
        scroller(`Lit Stream: ` + track.title, 'document')
        this.mediaPlayer.nowPlaying(track.id)
    },
    toggleShuffle() {
        let options = this.state.options
        options.shuffle = !options.shuffle
        this.setState({options})
    },
    toggleRepeat() {
        let options = this.state.options
        options.repeat = !options.repeat
        this.setState({options})
    },
    toggleVideo() {
        let options = this.state.options
        options.showVideo = !options.showVideo
        this.setState({options})
        $('#MediaTray').toggle()
    },
    render() {
        let component = this
        console.log(this.props.queue);
        if (this.props.queue.length > 0 && this.props.currentTrack == null) {
            this.props.nowPlaying(this.props.queue[0], 0)
        }

        return (
            <section id="Overlay">
            <div id="MediaTray">
                <MediaPlayer
                    ref={(child) => {this.mediaPlayer = child;}}
                    parent={this}></MediaPlayer>
            </div>
            </section>
        )
    }
})

const mapStateToProps = state => ({
  queue: state.queue,
  currentTrack: state.nowPlaying
})

const mapDispatchToProps = dispatch => ({
    updateQueue: bindActionCreators(updateQueue, dispatch),
    nowPlaying: bindActionCreators(nowPlaying, dispatch),
    nextTrack: bindActionCreators(nextTrack, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaTray)
