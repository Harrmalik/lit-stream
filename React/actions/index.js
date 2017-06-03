// Top level actions

// Search actions

// Queue actions
export const nowPlaying = (track) => ({
    type: 'NOW_PLAYING',
    track
})

export const updateQueue = (track, upNext) => ({
    type: 'UPDATE_QUEUE',
    track,
    upNext
})

export const setQueue = (queue) => ({
    type: 'SET_QUEUE',
    queue
})

export const removeTrack = (track) => ({
    type: 'REMOVE_TRACK',
    track
})

// MediaPlayer actions
export const setControls = (controls) => ({
    type: 'SET_CONTROLS',
    controls
})

export const nextTrack = (track) => ({
    type: 'NEXT_TRACK',
    track
})

export const prevTrack = (track) => ({
    type: 'PREV_TRACK',
    track
})

// Options actions
export const shuffle = () => ({
    type: 'SHUFFLE'
})

export const repeat = () => ({
    type: 'REPEAT'
})

export const autoPlay = () => ({
    type: 'AUTO_PLAY'
})
