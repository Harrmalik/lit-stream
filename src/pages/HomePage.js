// Dependencies
import React from 'react'

class HomePage extends React.Component{
    render() {
        return (
            <div className="page">
                <h2 className="ui header">Queue</h2>
                <div className="ui three column grid">
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/daniel.jpg" alt="demo"></img>
                      </div>
                      <div className="content">
                        <span className="header">EDM</span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/helen.jpg" alt="demo"></img>
                      </div>
                      <div className="content">
                        <span className="header">Trap</span>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="ui fluid card">
                      <div className="image">
                        <img src="/images/avatar/large/elliot.jpg" alt="demo"></img>
                      </div>
                      <div className="content">
                        <span className="header">Indie</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default HomePage
