import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchBox from '../components/SearchBox'
import Results from '../components/Results'
import MediaTray from '../components/MediaTray'
import * as QueueActions from '../actions'

let SearchPage = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    addToQueue(newTrack, upNext) {
        //this._child.updateQueue(newTrack, upNext)
        this.props.actions.updateQueue(newTrack, upNext)
    },
    render() {
        return (
            <div className="page">
                <SearchBox
                    callback={this.updateResults}></SearchBox>

                <Results
                    data={this.state.data ? this.state.data : null}
                    addToQueue={this.addToQueue}></Results>

                <MediaTray
                    ref={(child) => {this._child = child;}}
                    parent={this}></MediaTray>
            </div>
        )
    }
})

const mapStateToProps = state => ({
  queue: state.queue
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(QueueActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
