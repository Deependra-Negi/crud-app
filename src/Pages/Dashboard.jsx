import {useEffect, useState} from 'react'
import styled from 'styled-components'
import StudentCard from '../Components/StudentCard'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Components/Navbar'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Dashboard() {

    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');

    const [rerender, setRerender] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPagesNo, setTotalPageNo] = useState(0)

  const handleRerender = () => {
    setRerender(!rerender)
  }
    
    const [students, setStudents] = useState(null) 
    useEffect(() => {
        const getStudents = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/students?page=${pageNumber}&limit=10`)
                setStudents(res.data.students)
                setTotalPageNo(res.data.totalPages)
            } catch (err) {
                console.log(err)
            }
        }
        getStudents()
    }, [pageNumber, rerender])

    //age-sorting
    const handleAge = (event) => {
        setAge(event.target.value);
        axios.get(`http://localhost:5000/students/sort/${age}`)
            .then((res) => {
                setStudents(res.data)
            })
        .catch((err) => {
        console.log("err:", err)
      })
    };

    //gender-filter-------------
    const handleGender = (event) => {
        setGender(event.target.value);
        //console.log(gender)
        axios.get(`http://localhost:5000/students/filter/${gender}`)
            .then((res) => {
                console.log(res.data)
                setStudents(res.data)
            })
        .catch((err) => {
        console.log("err:", err)
      })
    };

    //city-filter-----------
    const handleCity = (event) => {
        setCity(event.target.value);
        console.log(city)
        axios.get(`http://localhost:5000/students/filter/${city}`)
            .then((res) => {
                console.log(res.data)
                setStudents(res.data)
            })
        .catch((err) => {
        console.log("err:", err)
      })
  };

    //console.log(students);
    console.log(pageNumber + 1);

    return (!students ? <span>loading...</span> :
        <Cont>
            <Navbar/>
        
            <CardCont>
                < Details >
                    <Data>NAME</Data>
                    <Data>AGE</Data>
                    <Data>GENDER</Data>
                    <Data>CITY</Data>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleAge}
                            >
                            <MenuItem value={-1}>High to low</MenuItem>
                            <MenuItem value={1}>Low to high</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={handleGender}
                            >
                            <MenuItem value={"Female"}>Male</MenuItem>
                            <MenuItem value={"Male"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city}
                            label="City"
                            onChange={handleCity}
                            >
                            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                            <MenuItem value={"Delhi"}>Delhi</MenuItem>
                            <MenuItem value={"Rudrapur"}>Rudrapur</MenuItem>
                            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                </Details >
                {students.map((s) => (
                    <StudentCard key={uuidv4()} data={s} handleRerender={handleRerender}/>
                ))}
                <PaginationCont>
                    <Stack spacing={2}>
                        <Pagination count={totalPagesNo}
                            variant="outlined"
                            shape="rounded"
                            defaultPage={pageNumber}
                            onChange={((e, value) => setPageNumber(value))} />
                    </Stack>
                </PaginationCont>
            </CardCont>
        </Cont>
    )
}


//-----styled-components-----


const Cont = styled.div`
    display: flex;
    flex-direction: column;
`
const CardCont = styled.div`
    width: 1000px;
    margin: auto;
    margin-top: 5rem;
`
const Details = styled.div`
    display: flex;
    background-color:#3e375e;
`
const Data = styled.div`
    padding: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #f7f7f7;
    width: 120px;
    &:first-child{
        width: 200px;
    }
`

const PaginationCont = styled.div`
    width:350px;
    margin: 2rem auto;
`