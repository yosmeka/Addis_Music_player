import { css } from '@emotion/react';
import React, { useRef, useState } from 'react'
import { Flex, Image, Text } from 'rebass';
import {FaPlay,  FaPause, FaForwardFast, FaBackwardFast, FaX, FaVolumeXmark, FaVolumeLow, FaVolumeHigh} from "react-icons/fa6"
import { ImLoop } from "react-icons/im";
import styled from '@emotion/styled';
import StyledIcon from './icons';
import { useDispatch, useSelector } from 'react-redux';
import { loop, play } from '../redux/slices/currentMusicSlice';


const style = css`
    position: fixed;
    bottom: 0;
    left: 0;
`

const SeekRange = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 1px;
    border-radius: 5px;
    background-color: white;
    outline: none;
    transition: all 0.3s;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    
    &:hover {
        height: 5px;
    }
    
    &:hover::-webkit-slider-thumb {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #00FFFF;
        cursor: pointer;
        opacity: 0;
    }

    &::-moz-range-thumb {
        appearance: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #00FFFF;
        cursor: pointer;
        opacity: 0;
    }

    &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0; 
        margin: 0;
        height: 5px;
        border-radius: 5px;
        background: #00FFFF; 
        width: ${props => props.value}%;
    }

    &::after {
        content: '${props => props.currentTime + '  /  ' + props.duration}';
        display: block;
        position: absolute;
        opacity: 1 !important;
        right: 0;
        margin: 4px;
        font-size; 5px;
    }
    
`

const VolumeRange = styled.input`
    -webkit-appearance: none;
    width: 75px;
    height: 5px;
    border-radius: 5px;
    outline: none;
    transition: all 0.3s;
    cursor: pointer;
    position: relative;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 4px;
        height: 10px;
        border-radius: 2px;
        background-color: #00FFFF;
        cursor: pointer;
    }
    &::-moz-range-thumb {
        appearance: none;
        width: 4px;
        height: 10px;
        border-radius: 2px;
        background-color: #00FFFF;
        cursor: pointer;
    }

    &:hover::after {
        content: '${props=>props.value+'%'}';
        left: ${props=>props.value+'%'};
        position: absolute;
        top: -15px;
        font-size: 10px;
        margin: 0;
        padding: 0;
    }
`

const changeTimeFormat = (time) => Math.floor(time/60) + ':' + (time%60<=9?'0':'') + Math.floor(time%60) 

const PlayingMusic = () => {
    const [range, setRange] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(90);
    const currentMusic = useSelector(state => state.currentMusic);
    const dispatch = useDispatch();
    
    const onTimeUpdated = (event) => {
        let currentTime = event.target.currentTime;
        let prevTime = range*duration/100;
        if(Math.abs(currentTime-prevTime) > 0.5){
            setRange((currentTime * 100) / (duration))
        }
    }
    
    const audioRef = useRef(null)
    if (audioRef.current) audioRef.current.volume = volume/100;
    
    return <Flex width={1} height={80} paddingX={3} paddingBottom={2} paddingTop={3} backgroundColor='#1F1F22' css={style} justifyContent={'space-between'}>
        <Flex width={250}>
            <Image width={64} src={currentMusic.music.image}/>
            <Flex flexDirection='column' paddingLeft={2}>
                <Text fontSize={15} mb={1}> {currentMusic.music.title} </Text>
                <Text fontSize={10} color='#FCFCFC77'> {currentMusic.music.artist.name} </Text>
            </Flex>
        </Flex>
        <Flex paddingLeft={10}>
            <Flex justifyContent='space-around' alignItems='center' width={250}>
                <FaBackwardFast onClick={() => {setRange(range-10); audioRef.current.currentTime = duration*(range-10)/100}}/>
                {
                    playing?
                    <FaPlay onClick={async () => {await audioRef.current.play(); setPlaying(false)}}/>:
                    <FaPause onClick={async () => {await audioRef.current.pause(); setPlaying(true)}}/>  
                }
                <FaForwardFast onClick={() => {setRange(range+10); audioRef.current.currentTime = duration*(range+10)/100}}/>
                <StyledIcon icon={ImLoop} color={currentMusic.loop && '#00FFFF'} onClick={()=>{
                    audioRef.current.loop = !loop;
                    dispatch(loop);
                }}/>
                <Flex alignItems='center'>
                    <StyledIcon icon={volume==0?FaVolumeXmark:FaVolumeHigh} margin={2.5} />
                    <VolumeRange type='range' value={volume} onChange={(e)=>setVolume(e.target.value)}/>
                </Flex>
            </Flex>
            
        </Flex>
        <SeekRange 
            type='range' 
            value={range} 
            duration={changeTimeFormat(duration)}
            currentTime={changeTimeFormat(duration*range/100)}
            onChange={(e) => audioRef.current.currentTime = duration*e.target.value/100}/>
        <audio 
            ref={audioRef} 
            src={currentMusic.music.audio} 
            onLoadedMetadata={(e) => setDuration(e.target.duration)} 
            onTimeUpdate={onTimeUpdated}
            onEnded={() => setPlaying(true)}
        ></audio>
        <FaX onClick={() => dispatch(play(null))}/>

    </Flex>
}

export default PlayingMusic;