import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store.js';

// Components
import SidePane from './components/SidePane'
import MediaControls from './components/MediaControls'

// Pages
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MediaViewPage from './pages/MediaViewPage'
import PlaylistPage from './pages/PlaylistPage'
import ChannelPage from './pages/ChannelPage'
// import HistoryPage from './pages/HistoryPage'
import QueuePage from './pages/QueuePage'
import SettingsPage from './pages/SettingsPage'
import LibraryPage from './pages/LibraryPage'

console.log(store.getState())
store.subscribe(() =>
  console.log(store.getState())
)

const App = () => (
  <Provider store={store}>
    <Router>
        <div className="main">
          <Route path="/" component={SidePane}/>

          <Route exact path="/" component={SearchPage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/player" component={MediaViewPage}/>
          <Route path="/playlist/:playlist" component={PlaylistPage}/>
          <Route path="/youtube/:playlist" component={PlaylistPage}/>
          <Route path="/soundcloud/:playlist" component={PlaylistPage}/>
          <Route path="/channel/:channelId" component={ChannelPage}/>
          <Route path="/library" component={LibraryPage}/>
          <Route path="/settings" component={SettingsPage}/>

          <MediaControls></MediaControls>
          <QueuePage></QueuePage>
        </div>
    </Router>
  </Provider>
)

export default App;
