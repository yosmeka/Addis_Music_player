import { css } from '@emotion/react';
import React, {useRef} from 'react';
import {
    Flex,
    Heading,
    Box,
  } from 'rebass'
import MusicCard from '../components/musicCard';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import styled from '@emotion/styled';


const hotMusicStyle = css`
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`
const LeftArrow = styled(FaAngleLeft)`
  cursor: pointer;
  background: #1F1F22;
  padding: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 2.5px;
`

const RightArrow = styled(FaAngleRight)`
  cursor: pointer;
  background: #1F1F22;
  padding: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 2.5px;
`

const SearchInput = styled('input')`
  width: 250px;
  height: 30px;
  padding: 1px 4px;
  background: #1F1F22;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 14px;
`

const scroll = function (element, by) {
  element.scrollTo({
    left: element.scrollLeft + by,
    behavior: 'smooth',
  })
}

export function Home() {
    const hotMusics = useRef(null);
    
    return (
            <Flex flexDirection='column' ml={5} mr={3} my={1} width={1}>
                <Flex py={1} justifyContent={"space-between"}>
                <Heading as='h2'>
                    Hot This Week
                </Heading>
                <Box>
                  <LeftArrow onClick={()=>{scroll(hotMusics.current, -400)}}/>
                  <RightArrow onClick={()=>{scroll(hotMusics.current, 400)}}/>
                </Box>
                </Flex>
                <Flex overflowX='scroll' ref={hotMusics} overflowY='hidden' ml={2} mt={2} mb={3} height={300} css={hotMusicStyle}>
                    <MusicCard hotMusic imageUrl='images/icons8-close-50.png'/>
                    <MusicCard hotMusic imageUrl='images/music.jpg'/>
                    <MusicCard hotMusic imageUrl='images/download.jpg'/>
                    <MusicCard hotMusic imageUrl='images/music.jpg'/>
                    <MusicCard hotMusic imageUrl='images/download.jpg'/>
                    <MusicCard hotMusic imageUrl='images/music.jpg'/>
                    <MusicCard hotMusic imageUrl='images/download.jpg'/>
                    <MusicCard hotMusic imageUrl='images/music.jpg'/>
                </Flex>

                <Flex py={1} justifyContent={"space-between"}>
                  <Heading as='h2' py={1}>
                      All Songs
                  </Heading>
                  <SearchInput placeholder='Search '/>
                </Flex>
                <Flex flexWrap='wrap' justifyContent='space-around' css={{gap: '10px'}}>
                    <MusicCard imageUrl='images/icons8-close-50.png' />
                    <MusicCard imageUrl='images/download.jpg' />
                    <MusicCard imageUrl='images/download.jpg' />
                    <MusicCard imageUrl='images/music.jpg'/>
                    <MusicCard imageUrl='images/music.jpg'/>
                    <MusicCard imageUrl='images/music.jpg'/>
                    <MusicCard imageUrl='images/music.jpg'/>
                    <MusicCard imageUrl='images/music.jpg'/>
                </Flex>
                {/* Vertical Padding */}
                <Box width={1} height={80}/>
            </Flex>
    )
}
