import styled from '@emotion/styled';
import React from  'react';

const StyledIcon = ({icon, margin, padding, width, height, color, ...props}) => {

    const StyledIcon = styled(icon)`
        margin: ${margin || '0'}px;
        padding: ${padding || '0'}px;
        width: ${width || 'auto'}${width&&'px'};
        height: ${height || 'auto'}${height&&'px'};
        &>*{
            color: ${color};
        }
    `
    
    return <StyledIcon {...props} /> 
}

export default StyledIcon