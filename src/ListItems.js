import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Item from './Item'
import { Button, Form } from 'react-bootstrap'
import Search from './Search'
import { AiOutlineSearch } from 'react-icons/ai'


const ListItems = React.memo(() => {
    console.log('List Item')

    const [result, setResult] = useState('')
    const [term, setTerm] = useState('')
    const [btnName, setBtnName] = useState(false)
    const [itemEdit, setItemEdit] = useState(null)

    const url = 'http://localhost:3001/tasks'

    useEffect(() => {
        console.log('useEffect')
        const fetchApi = async () => {
            const res = await axios.get(url)
            setResult(res.data)
        }
        fetchApi()
    }, [term, btnName])

    const handleSubmit = async (item, e) => {
        console.log('handleSubmit')
        setItemEdit(item)
        if (!item.id && btnName === false) {
            const res = await axios.post(url, { id: Math.floor(Math.random() * 1000), task: term, done: false })
            const data = await res
            setResult([...result, data.data])
            setTerm('')
        } else {
            setTerm(item.task)
            setBtnName(!btnName)
        }
    }
    const handleEditFianl = async () => {
        console.log('handleEditFianl')
        if (btnName === true) {
            await axios.patch(`${url}/${itemEdit.id}`, { id: itemEdit.id, task: term, done: itemEdit.done })
            setResult([...result])
            setTerm('')
            setBtnName(!btnName)
        }
    }

    return (
        <div className='mt-5 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-danger mb-5'>ToDo App</h1>
            <Form className='w-50'>
                <div className='d-flex'>
                    <AiOutlineSearch className='h1 mr-2 text-success' />
                    <Search
                        result={result}
                        setResult={setResult}
                    />
                </div>
                <div className='d-flex justify-content-center align-items-baseline'>
                    <Form.Control className='mb-4' type='text' placeholder='enter your task' value={term} onChange={(e) => setTerm(e.target.value)} />
                    <Button
                        className='mb-5 ml-2'
                        onClick={btnName ? handleEditFianl : handleSubmit}
                    >
                        {btnName ? 'Edit' : 'Add'}
                    </Button>
                </div>
            </Form>

            <Item
                result={result}
                setResult={setResult}
                handleSubmit={handleSubmit}
            />
        </div>
    )
})

export default ListItems   