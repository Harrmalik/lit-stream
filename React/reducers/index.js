import { combineReducers } from 'redux'
let defaultOptions = {
    playing: true,
    volume: 1,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    shuffle: false,
    showVideo: true,
    autoplay: true,
    repeat: false
}
let theQueue = [],
    theHistory = []


function options (state = defaultOptions, action) {
    switch (action.type) {
        case 'SHUFFLE':
            return { ...state, shuffle: !state.shuffle }

        case 'REPEAT':
            return { ...state, repeat: !state.repeat }

        case 'AUTOPLAY':
            return { ...state, autoplay: !state.autoplay }

        default:
            return state
    }
}

function queue (state = [], action) {
    theQueue = [...state]
    let index = 0
    if (action.track) {
        index = theQueue.findIndex(track => track.id == action.track.id)
    }

    switch (action.type) {
        case 'UPDATE_QUEUE':
            action.upNext ?
                theQueue.splice(1,0, action.track) :
                theQueue.push(action.track)
                return theQueue

        case 'SET_QUEUE':
            theQueue = action.queue
            return theQueue

        case 'REMOVE_TRACK':
            theQueue.splice(index,1)
            return theQueue

        default:
            return theQueue
    }
}

function history (state = [], action) {
    theHistory = [...state]
    switch (action.type) {
        case 'NEXT_TRACK':
            theHistory.push(theQueue[0])
            return theHistory

        case 'PREV_TRACK':
            return theHistory.push(theQueue[0])

        default:
            return state
    }
}

function nowPlaying (state = null, action) {
    let prevIndex,newIndex
    switch (action.type) {
        case 'NOW_PLAYING':
            return action.track

        case 'NEXT_TRACK':
            if (theQueue.length > 0) {
                if (action.track.repeat) {
                    newIndex = theQueue.findIndex(track => track.id == action.track.id)
                } else if (action.track.nextIndex) {
                    newIndex = action.track.nextIndex
                } else {
                    prevIndex = theQueue.findIndex(track => track.id == action.track.id)
                    newIndex = prevIndex < theQueue.length - 1 ? prevIndex + 1 : prevIndex
                }
                return theQueue[newIndex]

            } else {
                return state
            }

        case 'PREV_TRACK':
            if (theQueue.length > 0) {
                prevIndex = theQueue.findIndex(track => track.id == action.track.id)
                newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex
                return theQueue[newIndex]
            } else {
                return state
            }

        case 'PLAY_TRACK':
            return { ...state, playing: true }

        case 'STOP_TRACK':
            return { ...state, playing: false }

        case 'UPDATE_PROGRESS':
            return { ...state, played: action.played, playedSeconds: action.playedSeconds}

        case 'SET_DURATION':
            return { ...state, duration: action.duration}

        case 'IS_SEEKING':
            return {...state, isSeeking: !state.isSeeking}

        default:
            return state
    }
}

function controls (state = null, action) {
    switch (action.type) {
        case 'SET_CONTROLS':
            return action.controls.player

        default:
            return state
    }
}

function liked (state = localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : [], action) {
  let likedPlaylist = [...state],
      index = 0

  switch (action.type) {
      case 'ADD_LIKE':
          likedPlaylist.push(action.track)
          return likedPlaylist
      case 'REMOVE_LIKE':
          index = likedPlaylist.findIndex(track => track.id == action.track.id)
          likedPlaylist.splice(index,1)
          return likedPlaylist

      default:
          return state
  }
}

function playlists (state = localStorage.getItem('playlists') ? JSON.parse(localStorage.getItem('playlists')) : [], action) {
  let thePlaylists = [...state],
      index = 0
  if (action.playlist) {
      index = thePlaylists.findIndex(playlist => playlist.name == action.playlist.name)
  }
  switch (action.type) {
      case 'ADD_PLAYLIST':
          return [...state, action.playlist]

      // case 'SET_QUEUE':
      //     theQueue = action.queue
      //     return theQueue
      //
      case 'REMOVE_PLAYLIST':
          thePlaylists.splice(index,1)
          return thePlaylists

      default:
          return state
  }
}

const rootReducer = combineReducers({
    options,
    history,
    queue,
    nowPlaying,
    controls,
    liked,
    playlists
})

export default rootReducer
