import { css } from '@emotion/react';
import React, {useEffect, useRef, useState} from 'react';
import {
    Flex,
    Heading,
    Box,
    Button
  } from 'rebass'
import MusicCard from '../components/musicCard';
import StyledIcon from '../components/icons'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { MdOutlineAccountCircle } from "react-icons/md";
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStart, logout, logoutSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosUtils.js";


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

const DropDown = styled('label')`
  position: relative;
  min-width: 100px;
  display: flex;
  justify-content: space-around;
  background: #1F1F22;
  font-weight: bold;
  padding: 0.7rem 1rem;
  border-radius: 2px;
  margin-left: auto;
  margin-bottom: 5px;
  cursor: pointer;
`

const ItemsStyle = css`
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 50%;
  width: 100%;
  background: #1F1F22;
  text-align: center;
  transition: top 0.3s ease-out, opacity 0.2s ease-out;
  z-index: -1;
`

const CheckBox = styled('input')`
  display: none;
  &:checked ~ .items {
    top: 100%;
    opacity: 1;
    z-index: 1;
    margin-top: 3px;
}
`

const ListItem = styled('ul')`
  padding: 1rem;
  &:hover {
    background: #63676F;
    padding-left: 3px;
  }
`
const notificationStyle = css`
  position: absolute;
  padding: 10px;
  top: -20px;
  opacity: 0;
  font-size: 20px;
  margin: 10px;
  left: 50%;
  background: #63676F;
  border-radius: 10px;
  transition: all 0.1s ease;
`
const showNotification = css`
  top: 0;
  opacity: 1;
`

const scroll = function (element, by) {
  element.scrollTo({
    left: element.scrollLeft + by,
    behavior: 'smooth',
  })
}

export function Home() {
  const hotMusics = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loggedout) {
      setTimeout(() => {
        dispatch(logoutSuccess(false));
      }, 1000);
    }
  }, [auth.user, auth.loggedout]);
  
    
    return (
            <Flex flexDirection='column' ml={5} mr={3} my={1} width={1}>
                <Box css={!auth.loggedout?notificationStyle:[notificationStyle, showNotification]}>Successfully Logged Out</Box>
                <DropDown htmlFor='dropdown'>
                  <CheckBox type='checkbox' id='dropdown'/>
                  <StyledIcon icon={MdOutlineAccountCircle} width={15} margin={'0 5'} height={15}/> {auth?.user? auth.user.email: 'Account'} 
                  <Box css={ItemsStyle} className='items'>
                    <ListItem onClick={() => {
                      if (!auth.user)
                        navigate('signup')
                    }}>{auth.user? "Profile": 'SignUp'}</ListItem>
                    <ListItem onClick={()=>{
                      if (!auth.user)
                        navigate('login');
                      else {
                        dispatch(logout(auth.user.id))
                      }
                    }}>{auth.user? 'Logout': 'Login'}</ListItem>
                  </Box>
                </DropDown>
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
