// Top level actions

// Search actions

// Queue actions
export const nowPlaying = (track) => ({
    type: 'NOW_PLAYING',
    track
})

export const updateQueue = (newTrack, upNext) => ({
    type: 'UPDATE_QUEUE',
    newTrack,
    upNext
})

export const nextTrack = () => ({
    type: 'NEXT_TRACK'
})

// MediaPlayer actions
export const setControls = (controls) => ({
    type: 'SET_CONTROLS',
    controls
})
