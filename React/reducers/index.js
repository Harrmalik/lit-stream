import { combineReducers } from 'redux'
let defaultOptions = {
    shuffle: false,
    showVideo: true,
    autoplay: true,
    repeat: false
}
let theQueue = []


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

        case 'NEXT_TRACK':
            theQueue.splice(0,1)
            return theQueue

        default:
            return theQueue
    }
}

function nowPlaying (state = null, action) {
    switch (action.type) {
        case 'NOW_PLAYING':
            return action.track

        case 'NEXT_TRACK':
            return theQueue[1]


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
    nowPlaying,
    queue,
    controls
})

export default rootReducer
