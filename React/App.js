'use strict'

// Dependencies
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store.js'
import {globalShortcut} from 'electron'

// Components
import SidePane from './components/SidePane'
import MediaControls from './components/MediaControls'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MediaViewPage from './pages/MediaViewPage'
import PlaylistPage from './pages/PlaylistPage'
import ChannelPage from './pages/ChannelPage'
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
                  <Route path="/" component={SidePane}/>

                  <Route exact path="/" component={HomePage}/>
                  <Route path="/search" component={SearchPage}/>
                  <Route path="/player" component={MediaViewPage}/>
                  <Route path="/playlist/:playlist" component={PlaylistPage}/>
                  <Route path="/youtube/:playlist" component={PlaylistPage}/>
                  <Route path="/soundcloud/:playlist" component={PlaylistPage}/>
                  <Route path="/channel/:channelId" component={ChannelPage}/>
                  <Route path="/library" component={LibraryPage}/>
                  <Route path="/settings" component={SettingsPage}/>

                  <QueuePage/>
                  <MediaControls></MediaControls>
              </div>
          </Router>
      </Provider>
)


app.on('ready', function handleReady () {
  // Load our media keys
  // Copied from https://gist.github.com/twolfson/0a03820e27583cc9ad6e
  var registered = globalShortcut.register('medianexttrack', function () {
    console.log('medianexttrack pressed');
  });
  if (!registered) {
    console.log('medianexttrack registration failed');
  } else {
    console.log('medianexttrack registration bound!');
  }

  var registered = globalShortcut.register('mediaplaypause', function () {
    console.log('mediaplaypause pressed');
  });
  if (!registered) {
    console.log('mediaplaypause registration failed');
  } else {
    console.log('mediaplaypause registration bound!');
  }

  var registered = globalShortcut.register('mediaprevioustrack', function () {
    console.log('mediaprevioustrack pressed');
  });
  if (!registered) {
    console.log('mediaprevioustrack registration failed');
  } else {
    console.log('mediaprevioustrack registration bound!');
  }

  var registered = globalShortcut.register('mediastop', function () {
    console.log('mediastop pressed');
  });
  if (!registered) {
    console.log('mediastop registration failed');
  } else {
    console.log('mediastop registration bound!');
  }
});

ReactDom.render(<App />,
document.getElementById('react-app'))
