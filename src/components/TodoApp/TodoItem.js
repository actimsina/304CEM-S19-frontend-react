import React, { Component } from 'react'
import { Button, ListGroupItem, Input } from 'reactstrap'

export default class TodoItem extends Component {
    render() {
        const { task } = this.props
        return (
            <ListGroupItem className='d-flex justify-content-between align-items-center'>

                {
                    (task.done) ? <del>{task.name}</del> : <span>{task.name}</span>
                }

                <span>
                    <Button size='sm' color='warning' onClick={() => this.props.handleEdit(task._id)}>Edit</Button>
                    <Button size='sm' color='danger' className="ml-2"
                        onClick={() => this.props.handleDelete(task._id)}>Delete</Button>
                </span>
            </ListGroupItem>

        )
    }
}
