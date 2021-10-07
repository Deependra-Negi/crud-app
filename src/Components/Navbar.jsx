import React from 'react'
import styled from 'styled-components'

export default function Navbar() {
    return (
        <CardCont>
            <h3>Student Dashboard</h3> 
        </CardCont>
    )
}

//------styled-components-----

const CardCont = styled.div`
    background-color:#0b0618;
    width:100%;
    height:60px;
    text-align:center;
    h3{
        color: #fff;
        margin: 0;
        font-size: 2rem;
        font-weight:500;
        padding-top:0.3rem;
    }
`
