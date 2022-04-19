import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const Search = ({ setResult }) => {
    console.log('search')

    const [value, setValue] = useState('')
    const url = 'http://localhost:3001/tasks'

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(url)
            const search = res.data.filter(item => item.task.includes(value))
            setResult(search)
        }
        fetchApi()
    }, [value, setResult])



    return (
        <>
            <Form.Control
                className='mb-4'
                type='search'
                placeholder='search'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    )
}

export default Search