import React, { Component } from 'react'
import { Button, Container } from 'reactstrap'
import { Link } from 'react-router-dom';
import TodoForm from './TodoApp/TodoForm';
import TodoList from './TodoApp/TodoList';
import Axios from 'axios';
import TodoEdit from './TodoApp/TodoEdit';

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            user: {},
            currentTodo: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            showEdit: false,
            task: {}
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

    handleTodoEdit = (taskId) => {
        this.setState({
            task: this.state.tasks.find((task) => task._id === taskId),
            showEdit: !this.state.showEdit
        })
    }

    toggle = () => {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    updateTask = (taskId, taskName, taskDone) => {
        const updatedTasks = this.state.tasks.map((task) => {
            if (task._id === taskId) {
                task.name = taskName
                task.done = taskDone
            }
            return task;
        })
        this.setState({
            tasks: updatedTasks
        })
        Axios.put(`http://localhost:3001/tasks/${taskId}`, { name: taskName, done: taskDone }, this.state.config)
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
                    handleTodoDelete={this.handleTodoDelete}
                    handleTodoEdit={this.handleTodoEdit} />

                <TodoEdit showEdit={this.state.showEdit} toggle={this.toggle} task={this.state.task}
                    updateTask={this.updateTask}
                />
            </Container>
        )
    }
}
