import React from 'react'

let HistoryPage = React.createClass({
    getInitialState() {
        return {}
    },
    render() {
        return (
            <div className="page">
                <div className="ui modal">
                  <i className="close icon"></i>
                  <div className="header">
                    History
                  </div>
                  <div className="content">
                    <div id="history" className="ui items">
                        {_.map(component.props.history, function(track, index) {
                            return (
                                <Track
                                    key={track.id + (Math.floor(Math.random() * 100000) + 1)}
                                    track={track}
                                    parent={component.props.parent}
                                    position={index}></Track>
                            )
                        })}
                    </div>
                  </div>
                  <div className="actions">
                    <div className="ui black deny button">
                      Nope
                    </div>
                    <div className="ui positive right labeled icon button">
                      Yep, thats me
                      <i className="checkmark icon"></i>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
})

export default HistoryPage
