import { CakeView } from './features/cake/cakeView'
import { Contents } from './components/contents'
import Sidebar from './components/sideBar'
import {ThemeProvider} from '@emotion/react'
import theme from './theme';
import {Flex} from 'rebass';
import globalStyles from './globalStyle';
import { Global } from '@emotion/react';
import PlayingMusic from './components/playingMusic';
import SingleMusic from './pages/singleMusic';


function App() {

  return (
    <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <Flex bg='#171719'>
        <Sidebar />
        <Contents />
      <PlayingMusic />
      </Flex>
      
    </ThemeProvider>
    
    </>
  )
}

export default App
