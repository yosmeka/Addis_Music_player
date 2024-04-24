import { CakeView } from './features/cake/cakeView'
import { Home } from './pages/homePage'
import Sidebar from './components/sideBar'
import {ThemeProvider} from '@emotion/react'
import theme from './theme';
import {Flex} from 'rebass';
import globalStyles from './globalStyle';
import { Global } from '@emotion/react';
import PlayingMusic from './components/playingMusic';
import SingleMusic from './pages/singleMusic';
import {Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
    const currentMusic = useSelector(state => state.currentMusic);
    console.log(currentMusic)
    return (
      <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <Flex bg='#171719'>
          <Sidebar />
          <Routes>
            <Route path='/' element= {<Home />}/>
            <Route path='/:id' element= {<SingleMusic />}/>
          </Routes>

          {currentMusic.music && <PlayingMusic />}
        </Flex>
      </ThemeProvider>
      
      </>
    )
}

export default App
