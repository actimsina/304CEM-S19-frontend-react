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
            tasks: [],
            currentTodo: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/tasks', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    tasks: response.data
                })
            })
    }

    handleCurrentTodoChange = (newTodo) => {
        this.setState({
            currentTodo: newTodo
        })
    }

    handleTodoSubmit = (e) => {
        e.preventDefault();
        if (!this.state.currentTodo) return;

        Axios.post('http://localhost:3001/tasks', { name: this.state.currentTodo },
            this.state.config).then((response) => {
                this.setState({
                    tasks: [...this.state.tasks, response.data],
                    currentTodo: ''
                })
            })
    }

    handleTodoDelete = (taskId) => {
        const filteredTask = this.state.tasks.filter((task) => {
            return task._id !== taskId
        })
        this.setState({
            tasks: filteredTask
        })
        Axios.delete(`http://localhost:3001/tasks/${taskId}`, this.state.config)
    }

    updateTask = (updatedTask) => {
        const updatedTasks = this.state.tasks.map((task) => {
            if (task._id === updatedTask._id) {
                task = updatedTask
            }
            return task;
        })
        this.setState({
            tasks: updatedTasks
        })
        Axios.put(`http://localhost:3001/tasks/${updatedTask._id}`,
            { name: updatedTask.name, done: updatedTask.done },
            this.state.config).then((response) => console.log(response.data));
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container className='mt-4'>
                    <TodoForm currentTodo={this.state.currentTodo}
                        handleCurrentTodoChange={this.handleCurrentTodoChange}
                        handleTodoSubmit={this.handleTodoSubmit}
                    />
                    <TodoList tasks={this.state.tasks}
                        handleTodoDelete={this.handleTodoDelete}
                        updateTask={this.updateTask} />
                </Container>
            </React.Fragment>
        )
    }
}
