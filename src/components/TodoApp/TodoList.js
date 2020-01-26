import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

export default class TodoList extends Component {

    handleDelete = (taskId) => {
        this.props.handleTodoDelete(taskId)
    }

    handleEdit = (taskId) => {
        this.props.handleTodoEdit(taskId)
    }

    render() {
        const { tasks } = this.props
        return (
            <div>
                <Table>
                    <tbody>
                        {
                            tasks.map((task) => {
                                return (<tr key={task._id}>
                                    <td>
                                        {
                                            (task.done) ? <del>{task.name}</del> : <span>{task.name}</span>
                                        }
                                    </td>
                                    <td>
                                        <Button size='sm' color='warning' onClick={() => this.handleEdit(task._id)}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button size='sm' color='danger'
                                            onClick={() => this.handleDelete(task._id)}>Delete</Button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
