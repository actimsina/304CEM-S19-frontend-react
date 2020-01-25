import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

export default class TodoList extends Component {
    render() {
        const { tasks } = this.props
        return (
            <Table>
                <tbody>
                    {
                        tasks.map((task) => {
                            return (<tr key={task._id}>
                                <td>{task.name}</td>
                                <td>
                                    <Button size='sm' color='warning'>Edit</Button>
                                </td>
                                <td>
                                    <Button size='sm' color='danger'>Delete</Button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        )
    }
}
