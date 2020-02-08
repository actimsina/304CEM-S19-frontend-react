import React, { Component } from 'react'
import { Button, ListGroupItem } from 'reactstrap'

export default class TodoItem extends Component {



    render() {
        const { task, itemClick, showNotes, handleTaskDelete } = this.props
        return (
            <ListGroupItem onClick={() => itemClick(task)} className='d-flex justify-content-between align-items-center'>

                {
                    (task.done) ? <del>{task.name}</del> : <span>{task.name}</span>
                }

                <span>
                    <Button size='sm' color='info' onClick={() => showNotes(task._id)}>Notes</Button>
                    <Button size='sm' color='danger' className="ml-2"
                        onClick={() => handleTaskDelete(task._id)}>Delete</Button>
                </span>
            </ListGroupItem>

        )
    }
}
