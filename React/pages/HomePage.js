import React from 'react'

let HomePage = React.createClass({
    getInitialState() {
        return {}
    },
    render() {
        return (
            <div className="page">
                <h2 className="ui header">Queue</h2>
                <div className="ui three column grid">
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/daniel.jpg"></img>
                      </div>
                      <div className="content">
                        <a className="header">EDM</a>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/helen.jpg"></img>
                      </div>
                      <div className="content">
                        <a className="header">Trap</a>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/elliot.jpg"></img>
                      </div>
                      <div className="content">
                        <a className="header">Indie</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
})

export default HomePage
