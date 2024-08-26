import React from 'react';
import { Box, Text } from 'rebass';
import { css } from '@emotion/react';

const toastStyle = css`
    position: fixed;
    top: 25px;
    right: -200px;
    font-weight: bold;
    color: white;
    max-width: 200px;
    padding: 1rem;
    border-radius: 8px 0 0 8px;
    transition: right 400ms ease-in;
    z-index: 100;
`

const CustomToast = ({text, display, background}) => {
  return (
    <Box css={display?[toastStyle, `right: 0; background: ${background}`]: [toastStyle, `background: ${background}`]}>
        {text}
    </Box>
  )
}

export default CustomToast
