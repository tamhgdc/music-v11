import React, {useState, useRef, useEffect } from 'react';
import PlayerDetails from './playerDetails';
import PlayerControls from './playerControls';

function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [percentage,setPercentage] = useState(0);
    useEffect(() => {
        if(percentage === 100){
            SkipSong();
        }
        else if(isPlaying){
            audioEl.current.play();
        }
        else{
            audioEl.current.pause();
        }
    });
    const SkipSong = (forward = true) => {
        if(forward){
            props.setCurrentSongIndex( () => {
                let temp = props.currentSongIndex;
                temp++;
                if(temp > props.songs.length - 1){
                    temp = 0;
                }
                console.log(temp);
                return temp;
            });
        }else{
            props.setCurrentSongIndex( () => {
                let temp = props.currentSongIndex;
                temp--;
                if(temp < 0){
                    temp = props.songs.length - 1;
                }
                console.log(temp);
                return temp;
            });
        }
    }
    
    const rotation = (isPlaying) => {
        if (isPlaying)
            return 'details-img rotate';
        else
            return 'details-img';
    }

    return (
        <div>
            <audio 
                src={props.songs[props.currentSongIndex].src} 
                ref={audioEl}
                onTimeUpdate = {(e) => setPercentage((e.currentTarget.currentTime / e.currentTarget.duration) * 100 )}>
            </audio>

            <div className="right">
                <img className={rotation(isPlaying)} src={props.songs[props.currentSongIndex].img_source} alt=""/>
                <PlayerDetails 
                    song = {props.songs[props.currentSongIndex]} 
                />
                <input type = "range" className = "slider" id="#appearance1" step="0.01" value = {percentage}  
                onChange={(e) => {
                    const audio = audioEl.current
                    audio.currentTime = (audio.duration / 100) * e.target.value;
                    setPercentage(e.target.value);
                    }}></input>
                <PlayerControls 
                    isPlaying = {isPlaying} 
                    setIsPlaying={setIsPlaying} 
                    SkipSong={SkipSong} 
                />
            </div>
            
        </div>
    )
}

export default Player
