import { css } from "@emotion/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Heading, Text, Button } from "rebass";

const singleMusicStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background: #171719a4;
`

const imageStyle = css`
    width: 40%;
    height: 100%;
    border-bottom-left-radius: 5%;
    border-top-left-radius: 5%;
`
    
const buttonStyle = css`
    cursor: pointer;
`

const infoStyle = css`
    gap: 5px;
`

const fetchMusic = async (id) => {
    const res = await fetch("http://localhost:3000/api/music/66227421c6df342cd1748ef6");
    console.log(res);
    const data = await res.json();
    console.log(data);

}
const SingleMusic = () => {
    const { id }= useParams();
    const navigate = useNavigate();
    console.log(navigate)
    useEffect(() => {
        fetchMusic();
    }, []);

    return <Flex css={singleMusicStyle} onClick={() => navigate(-1)}>
        <Flex backgroundColor='#171719' margin='auto' height='60%' width='70%'>
            <Image src="images/download.jpg" css={imageStyle}/>
            <Flex flexDirection='column' padding={15} width={1} css={infoStyle}>
                <Heading as='h2' fontFamily={"'Inter', sans-serif"} fontSize={26} lineHeight='150%'>
                    Nice Music
                </Heading>
                <Heading as='h4' fontFamily={'sans-serif'} fontSize={20} fontWeight={5} lineHeight='100%'>
                    Artist Name
                </Heading>
                <Text flexGrow={1} padding={1} color='#FCFCFCaf'>
                t was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <Flex justifySelf='end' alignSelf='flex-end' justifyContent='end'>
                    <Button marginX={1} backgroundColor='#1F1F22' css={buttonStyle}>
                        Add To Playlist
                    </Button>
                    <Button marginX={1} backgroundColor='#1F1F22' css={buttonStyle}>
                        Add To Favourites
                    </Button>

                </Flex>
            </Flex>
        </Flex>

    </Flex>
}

export default SingleMusic;