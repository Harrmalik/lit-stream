'use strict'

// Dependencies
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store.js'

// Components
import SidePane from './components/SidePane'
import MediaControls from './components/MediaControls'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MediaViewPage from './pages/MediaViewPage'
import PlaylistPage from './pages/PlaylistPage'
import HistoryPage from './pages/HistoryPage'
import QueuePage from './pages/QueuePage'
import SettingsPage from './pages/SettingsPage'
import LibraryPage from './pages/LibraryPage'

console.log(store.getState())
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

const App = () => (
      <Provider store={store}>
          <Router>
              <div className="main">
                  <Route exact path="/" component={SidePane}/>
                  <Route path="/:page" component={SidePane}/>

                  <Route exact path="/" component={HomePage}/>
                  <Route path="/search" component={SearchPage}/>
                  <Route path="/player" component={MediaViewPage}/>
                  <Route path="/playlist/:playlist" component={PlaylistPage}/>
                  <Route path="/queue" component={QueuePage}/>
                  <Route path="/history" component={HistoryPage}/>
                  <Route path="/library" component={LibraryPage}/>
                  <Route path="/settings" component={SettingsPage}/>

                  <MediaControls></MediaControls>
              </div>
          </Router>
      </Provider>
)

ReactDom.render(<App />,
document.getElementById('react-app'))
