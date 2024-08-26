import React from "react";
import { Box, Card, Image, Heading, Text, Flex } from 'rebass'
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import { FaPlay } from 'react-icons/fa6'
import { useDispatch } from "react-redux";
import { play } from "../redux/slices/currentMusicSlice";

const cardStyle = css`
    border-radius: 8px;
`

const infoBox = css`
    position: relative;
    height: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    flex-direction: column;
    &>* {
        position: relative;
    }
`

const CategoriesCard = styled(Card)`
    min-width: 25px;
    min-height: 10px;
    border-radius: 10px;
    padding: 2px 5px;
    margin: 5px;
    font-size: small;
`

const PlayButton = styled(FaPlay)`
    position: absolute;
    top: -10px;
    right: 10%;
    background-color: white;
    padding: 7px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;
    &>*{
        color: black;
    }
`

const imageStyle = css`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    object-fit: cover;
`

// Blurred Background
const blurStyle = css`
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:0;
    background: #000000aa;
    backdrop-filter: blur(10px);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`
const categoriesToColor = new Map();
categoriesToColor.set('jazz', '#ff3030');
categoriesToColor.set('hiphop', '#3939f1');
categoriesToColor.set('slow', '#2f851f');
categoriesToColor.set('rock', '#856c12');
categoriesToColor.set('sad', '#7f3fc5');
categoriesToColor.set('happy', '#3939f1');

const MusicCard = ( {hotMusic, imageUrl, title, audio, album, categories, artist} ) => {
    const dispatch = useDispatch();
    console.log(audio.url)
    return <Card
            display='flex'
            flexDirection='column'
            justifyContent='center'
            boxShadow='0 0 16px rgba(0, 0, 0, .25)'
            minWidth={hotMusic ? 230: 200}
            maxWidth={hotMusic ? 230: 200}
            mb={!hotMusic && 3}
            css={cardStyle}
            >
            
            <Image src={imageUrl} css={hotMusic&&imageStyle} minHeight={ hotMusic ? 200: 130} maxHeight={ hotMusic ? 200: 130} />

            <Box px={hotMusic? 2: 0} m={0} css={infoBox} sx={hotMusic && {
                backgroundImage: 'url('+imageUrl+')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>

                {hotMusic && <Box css={blurStyle} />}
                <PlayButton onClick={() => {console.log('Clicked');dispatch(play({
                    audio: 'http://localhost:3000/'+audio.url,
                    artist: artist.name,
                    title: title,
                    image: imageUrl
                }))}}/>
                <Heading as='h3' my={1}>
                    {title}
                </Heading>

                <Text fontSize={13} my={1}>
                    By: {artist.name}
                </Text>

                <Flex justifyContent="space-around" flexWrap='wrap' alignItems='center' width={1} flexGrow={1} height='50%'>
                    {categories.map(category => 
                        <CategoriesCard backgroundColor={categoriesToColor.get(category)}>
                            {category.toUpperCase()}
                        </CategoriesCard>
                    )}
                </Flex>
            </Box>
        </Card>
}

export default MusicCard;
