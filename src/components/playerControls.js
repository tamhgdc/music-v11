import React from 'react';

function PlayerControls(props) {
    return (
        <div className="c-player--controls">
            <button className="skip-btn" onClick = {() => props.SkipSong(false)} >
                <i className="fa fa-backward"></i>
            </button>
            <button className="play-btn" onClick = {() => props.setIsPlaying(!props.isPlaying)}>
                {props.isPlaying? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i> }
            </button>
            <button className="skip-btn" onClick = {() => props.SkipSong()}>
                <i className="fa fa-forward"></i>
            </button>
            
        </div>
    )
}

export default PlayerControls;