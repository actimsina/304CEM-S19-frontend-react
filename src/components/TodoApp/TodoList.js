import React, { Component } from 'react'
import { Table } from 'reactstrap'
import TodoEdit from './TodoEdit'
import TodoItem from './TodoItem'

export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEdit: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            task: {}
        }
    }

    handleEdit = (taskId) => {
        this.setState({
            task: this.props.tasks.find((task) => {
                return task._id === taskId
            })
        })
        this.toggle();
    }

    toggle = () => {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    handleTaskNameChange = (taskName) => {
        this.setState({
            task: { ...this.state.task, name: taskName }
        })
    }

    handleTaskDoneChange = (isDone) => {
        this.setState({
            task: { ...this.state.task, done: isDone }
        })
    }
    updateTask = (updatedTask) => {
        this.props.updateTask(updatedTask)
    }
    render() {
        const { tasks } = this.props
        return (
            <div>
                <Table>
                    <tbody>
                        {
                            tasks.map((task) => {
                                return <TodoItem key={task._id} task={task}
                                    handleDelete={this.props.handleTodoDelete}
                                    handleEdit={this.handleEdit} />
                            })
                        }
                    </tbody>
                </Table>

                <TodoEdit showEdit={this.state.showEdit} toggle={this.toggle}
                    task={this.state.task}
                    handleTaskNameChange={this.handleTaskNameChange}
                    handleTaskDoneChange={this.handleTaskDoneChange}
                    updateTask={this.updateTask}

                />
            </div>
        )
    }
}
