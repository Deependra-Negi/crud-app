import {useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

export default function StudentCard({data, handleRerender}) {

    const handleEdit = ({ data }) => {
        const studentId = data._id;
        console.log(studentId)
        axios.patch(`http://localhost:5000/students/${studentId}`)
            .then((res) => {
                console.log(res)
            })
        .catch((err) => {
        console.log("err:", err)
      })
    }

    const handleDelete = (data ) => {
        const studentId = data._id;
        console.log(studentId)
        axios
            .delete(`http://localhost:5000/students/${studentId}`)
            .then((res) => {
                console.log(res)
                handleRerender()
            })
            .catch((err) => {
            console.log(err)
            })
        }
       // console.log('ddddddddddddd',data)
    return (
        !data ? <></> :
        <>
            <CardCont>
                < Details >
                    <Data>{data.name}</Data>
                    <Data>{data.age}</Data>
                    <Data>{data.gender}</Data>
                    <Data>{data.city}</Data>
                </Details >
                <Buttons>
                    <Edit>
                         <button onClick={()=>handleEdit(data)}>Edit</button>
                    </Edit>
                    <Delete>
                        <button onClick={()=>handleDelete(data)}>Delete</button>
                    </Delete>
            </Buttons>
            </CardCont >
        </>
     )
}

//-----styled-components------

const CardCont = styled.div`
    border: 1px solid #e9e9e9;
    display: flex;
    justify-content:space-between;
`
const Details = styled.div`
    display: flex;
    justify-content: space-between;
`
const Data = styled.div`
    padding: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color:#202020;
    width: 120px;
    &:first-child{
        width: 200px;
    }
`
const Buttons = styled.div`
    display: flex;
`
const Edit = styled.div`
width: 100px;
height: 100%;
padding: 0.2rem;
button{
    background-color:#2c58e7dc;
    width: 100%;
    height: 100%;
    color:#fff;
}
`
const Delete = styled.div`
width: 100px;
height: 100%;
padding: 0.2rem;
button{
    background-color:#ff3737dc;
    width: 100%;
    height: 100%;
    color:#fff;
}
`
const Btn = styled.button`

`
