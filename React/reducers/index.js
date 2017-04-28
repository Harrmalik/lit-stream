import { combineReducers } from 'redux'

function queue (state = [], action) {
    switch (action.type) {
        case 'UPDATE_QUEUE':
            return [
                    ...state,
                    action.newTrack
                ]

        default:
            return state
    }
}

const rootReducer = combineReducers({
  queue
})

export default rootReducer
