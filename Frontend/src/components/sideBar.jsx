import React, {useState} from 'react';
import { Box, Flex, Text } from 'rebass';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  css
} from '@emotion/react';
import { FaArrowLeft } from 'react-icons/fa6'
import { NavLink, Outlet } from 'react-router-dom'
import { MdHouse, MdViewSidebar, MdFavorite, MdFeaturedPlayList, MdPerson, MdCategory } from 'react-icons/md'
import StyledIcon from './icons';


const boxStyle = css`
    transition: all 0.5s ease;
    position: fixed;
  `;

const BurgerIcon = styled(MdViewSidebar)`
  width: 40px;
  height: 40px;
  margin: auto;
  cursor: pointer;
`

const side_bar=[
  {title: "Home", icon: () => <StyledIcon icon={MdHouse} width={20} height={20}/>},
  {title: "Favorite", icon: () => <StyledIcon icon={MdFavorite} width={20} height={20}/>},
  {title: "Play List", icon: () => <StyledIcon icon={MdFeaturedPlayList} width={20} height={20}/>},
  {title: "Profile", icon: () => <StyledIcon icon={MdPerson} width={20} height={20}/>},
  {title: "Category", icon: () => <StyledIcon icon={MdCategory} width={20} height={20}/>},
]

const transition = css`
  min-width: 50px !important;
`
const Sidebar = () => {
  const theme = useTheme();
  const [isOpen, setOpen] = useState(true);
  
  const primaryColor = theme.colors.bg_primary;
  const selectedBg = theme.colors.bg_secondary;
  
  const SideBarNav = styled(NavLink)`
    width: 100%;
    padding: 15px;
    &.active {
      color: #00FFFF;
      padding-left: 20px;
    }

    &:hover {
      background: #63676F;
      padding-left: 20px;
    }
  `
  const onToggle = () =>  {
      setOpen(!isOpen)
  }
  
  

  return (
    <>
      <Box minWidth={250} css={!isOpen && transition} height={1} backgroundColor='000000ff'/>
      <Box
        minWidth={250}
        height="100vh"
        bg='#212124'
        overflow="hidden"
        css= {isOpen?boxStyle:[boxStyle,  transition]}
      > 

        <Flex
        justifyContent="space-between"
        alignItems="start"
        height="50px"
        cursor="pointer"
        padding={2}
        >
        {isOpen ?
          <>
            <Text fontSize={4} fontWeight={'bold'} height={25}>Music App</Text>
            <FaArrowLeft onClick={onToggle}/>
          </>
          :  
          <BurgerIcon onClick={onToggle}/>      
        }
        </Flex>
      
        <Flex flexDirection='column' height='300px' justifyContent='end'>
          {side_bar.map(val => 
            <SideBarNav key={val.title} to={'/'+val.title}>
              {/* {} */}
              {isOpen? val.title: val.icon()}
            </SideBarNav>
          )}
        </Flex> 
      </Box>
      <Outlet />
    </>
 
  );
};

export default Sidebar;
