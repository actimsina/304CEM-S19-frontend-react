import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class TodoItem extends Component {
    render() {
        const { task } = this.props
        return (
            <tr>
                <td>
                    {
                        (task.done) ? <del>{task.name}</del> : <span>{task.name}</span>
                    }
                </td>
                <td>
                    <Button size='sm' color='warning' onClick={() => this.props.handleEdit(task._id)}>Edit</Button>
                </td>
                <td>
                    <Button size='sm' color='danger'
                        onClick={() => this.props.handleDelete(task._id)}>Delete</Button>
                </td>
            </tr>
        )
    }
}
