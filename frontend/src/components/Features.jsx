import React from 'react';
import styled from 'styled-components';

const Features = ({title,children,description}) => {
    return (

    <Container>
        <div>{children}</div>
        <p style={{fontWeight:'bold'}} >{title}</p>
        <p>{description}</p>
    </Container>
    )
    
}

const Container = styled.div`
border-radius: 15px;
width: 200px;
padding:10px;
border: 1px solid black;
color:black;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
text-align:justify;
` 

export default Features;