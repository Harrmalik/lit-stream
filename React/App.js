// Dependencies
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

// Components
import SidePane from './components/SidePane'
import MediaControls from './components/MediaControls'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MediaViewPage from './pages/MediaViewPage'
import HistoryPage from './pages/HistoryPage'
import QueuePage from './pages/QueuePage'
import SettingsPage from './pages/SettingsPage'
import LibraryPage from './pages/LibraryPage'

let containerStyle = {
    width: "100%",
    height: "100%"
}

const store = createStore(reducer)

let App = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    componentDidMount() {

    },
    updateResults(data) {
        this.setState({data: [data]})
    },
    addToQueue(newTrack, upNext) {
        this._child.updateQueue(newTrack, upNext)
    },
    render() {
        console.log(this.state.data)
        return (
            <Provider store={store}>
                <Router>
                    <div className="main" style={ !this.state.data ? {} : containerStyle}>
                        <SidePane parent={this}></SidePane>

                        <Route exact path="/" component={HomePage}/>
                        <Route path="/search" component={SearchPage}/>
                        <Route path="/player" component={MediaViewPage}/>
                        <Route path="/queue" component={QueuePage}/>
                        <Route path="/history" component={HistoryPage}/>
                        <Route path="/library" component={LibraryPage}/>
                        <Route path="/settings" component={SettingsPage}/>

                        <MediaControls parent={this}></MediaControls>
                    </div>
                </Router>
            </Provider>
        )
    }
})

console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

ReactDom.render(<App />,
document.getElementById('react-app'))
