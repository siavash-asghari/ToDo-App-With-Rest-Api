import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ListGroup, Spinner } from 'react-bootstrap'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'

const Item = React.memo(({ result, setResult, handleSubmit }) => {
    console.log('Item')
    const [removeRender, setRemoveRender] = useState(false)
    const [checked, setChecked] = useState(false)

    const url = 'http://localhost:3001/tasks'

    const handleRemove = async (item) => {
        console.log('handleRemove')
        await axios.delete(`${url}/${item.id}`, { id: item.id, task: item.task, done: item.done })
        setResult([...result])
        setRemoveRender(!removeRender)
    }

    const handleEdit = async (item) => {
        handleSubmit(item)
    }

    const handleCheck = async (item) => {
        setChecked(!checked)
        await axios.patch(`${url}/${item.id}`, { id: item.id, task: item.task, done: checked })
        setResult([...result])
    }

    useEffect(() => {
        console.log('useEffect')
        const fetchApi = async () => {
            const res = await axios.get(url)
            setResult(res.data)
        }
        fetchApi()
    }, [removeRender, checked, setResult])



    return (
        <div className='w-50'>
        <h5 className='text-center text-primary mb-3'>ToDo List</h5>
            {
                result ?
                    result.map(item => (
                        <ListGroup as='ul' key={item.id} className='d-flex align-items-center mb-2'>
                            <ListGroup.Item
                                as='li'
                                className="w-100 d-flex flex-row justify-content-between"
                            >
                                <div>
                                    {item.task}
                                </div>
                                <div className='d-flex'>
                                    <AiTwotoneEdit
                                        className='h5 text-info mr-2'
                                        onClick={() => handleEdit(item)}
                                    />
                                    <AiFillDelete
                                        className='h5 text-danger mr-2'
                                        onClick={() => handleRemove(item)}
                                    />
                                    <div
                                        onClick={() => handleCheck(item)}
                                        className='custom-control custom-switch'
                                    >
                                        <input
                                            type='checkbox'
                                            className='custom-control-input'
                                            checked={item.done}
                                            readOnly
                                        />
                                        <label className='custom-control-label'>
                                            {item.done ? 'Done' : 'Do It'}
                                        </label>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    )) : <Spinner animation="border" variant="info" />
            }
        </div>
    )
})

export default Item