import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'
import { Link } from 'react-router-dom';
import TodoForm from './TodoApp/TodoForm';
import TodoList from './TodoApp/TodoList';
import Axios from 'axios';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            user: {},
            currentTodo: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });

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
                    tasks: [response.data, ...this.state.tasks],
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

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    render() {
        return (
            <Container>
                Welcome <Link to='/profile'> {this.state.user.username} </Link>
                <Button color='link' onClick={this.handleLogout}> Logout</Button>
                <TodoForm currentTodo={this.state.currentTodo}
                    handleCurrentTodoChange={this.handleCurrentTodoChange}
                    handleTodoSubmit={this.handleTodoSubmit}
                />

                <TodoList tasks={this.state.tasks}
                    handleTodoDelete={this.handleTodoDelete} />
            </Container>
        )
    }
}
