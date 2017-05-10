import { combineReducers } from 'redux'
let defaultOptions = {
    shuffle: false,
    showVideo: true,
    autoplay: true,
    repeat: false
}
let theQueue = []
let theHistory = []


function options (state = defaultOptions, action) {
    switch (action.type) {
        default:
            return state
    }
}

function queue (state = [], action) {
    theQueue = [...state]
    switch (action.type) {
        case 'UPDATE_QUEUE':
            action.upNext ?
                theQueue.splice(1,0, action.newTrack) :
                theQueue.push(action.newTrack)
                return theQueue

        case 'SET_QUEUE':
            theQueue = action.queue
            return theQueue

        case 'REMOVE_TRACK':
            let index = theQueue.findIndex(track => track.id == action.track.id)
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
    switch (action.type) {
        case 'NOW_PLAYING':
            return action.track

        case 'NEXT_TRACK':
            if (theQueue.length > 0) {
                let prevIndex = theQueue.findIndex(track => track.id == action.track.id)
                let newIndex = prevIndex < theQueue.length - 1 ? prevIndex + 1 : prevIndex
                return theQueue[newIndex]

            } else {
                return state
            }

        case 'PREV_TRACK':
            if (theQueue.length > 0) {
                let prevIndex = theQueue.findIndex(track => track.id == action.track.id)
                let newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex
                return theQueue[newIndex]
            } else {
                return state
            }

        default:
            return state
    }
}

function controls (state = null, action) {
    switch (action.type) {
        case 'SET_CONTROLS':
            return action.controls

        default:
            return state
    }
}

const rootReducer = combineReducers({
    options,
    history,
    queue,
    nowPlaying,
    controls
})

export default rootReducer
