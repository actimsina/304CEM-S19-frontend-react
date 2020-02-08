import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TodoForm from './TodoApp/TodoForm';
import TodoList from './TodoApp/TodoList';
import Axios from 'axios';
import Navigation from './Navigation';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskId: '',
            taskName: '',
            taskDone: false,
            isEdit: false,
            tasks: [],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/tasks', this.state.config)
            .then((response) => {
                this.setState({
                    tasks: response.data
                })
            })
    }

    handleTaskNameChange = (taskName) => {
        this.setState({
            taskName: taskName
        })
    }

    handleTaskDoneChange = (isDone) => {
        this.setState({
            taskDone: isDone
        })
    }

    handleTaskSubmit = (e) => {
        e.preventDefault();
        if (!this.state.taskName) return;

        Axios.post('http://localhost:3001/tasks',
            {
                name: this.state.taskName,
                done: this.state.taskDone
            },
            this.state.config).then((response) => {
                this.setState({
                    tasks: [...this.state.tasks, response.data],
                    taskName: ''
                })
            })
    }

    handleTaskDelete = (taskId) => {
        Axios.delete(`http://localhost:3001/tasks/${taskId}`, this.state.config)
            .then((response) => {
                const filteredTask = this.state.tasks.filter((task) => {
                    return task._id !== taskId
                })
                this.setState({
                    tasks: filteredTask
                })
            })
    }

    handleTaskUpdate = (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:3001/tasks/${this.state.taskId}`,
            { name: this.state.taskName, done: this.state.taskDone },
            this.state.config)
            .then((response) => {
                console.log(response.data);
                const updatedTasks = this.state.tasks.map((task) => {
                    if (task._id === response.data._id) {
                        task = response.data
                    }
                    return task;
                })
                this.setState({
                    tasks: updatedTasks,
                    taskName: '',
                    taskDone: false,
                    taskId: '',
                    isEdit: false
                })
            }).catch((err) => console.log(err.response));
    }


    itemClick = (task) => {
        this.setState({
            isEdit: !this.state.isEdit,
            taskId: task._id,
            taskName: task.name,
            taskDone: task.done
        })

        if (this.state.isEdit) {
            this.setState({
                taskId: '',
                taskName: '',
                taskDone: false
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
                    <TodoForm taskName={this.state.taskName}
                        taskDone={this.state.taskDone}
                        isEdit={this.state.isEdit}
                        handleTaskNameChange={this.handleTaskNameChange}
                        handleTaskDoneChange={this.handleTaskDoneChange}
                        handleTaskAdd={this.handleTaskSubmit}
                        handleTaskUpdate={this.handleTaskUpdate}
                    />
                    <TodoList tasks={this.state.tasks}
                        handleTaskDelete={this.handleTaskDelete}
                        itemClick={this.itemClick}
                    />
                </Container>
            </React.Fragment>
        )
    }
}
