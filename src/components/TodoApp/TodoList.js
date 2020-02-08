import React, { Component } from 'react'
import { Table } from 'reactstrap'
import TodoItem from './TodoItem'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label, ListGroup, ListGroupItem } from 'reactstrap'
import Axios from 'axios'

export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showEdit: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            task: {},
            noteText: ''
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


    updateTask = (updatedTask) => {
        this.props.updateTask(updatedTask)
    }

    handleNoteTextChange = (e) => {
        this.setState({
            noteText: e.target.value
        })
    }

    handleNoteSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3001/tasks/${this.state.task._id}/notes`,
            { desc: this.state.noteText }, this.state.config)
            .then((response) => {
                this.setState({
                    task: response.data,
                    noteText: ''
                })
            }).catch((err) => console.log(err))
    }

    handleNoteDelete = (noteId) => {
        Axios.delete(`http://localhost:3001/tasks/${this.state.task._id}/notes/${noteId}`,
            this.state.config).then((response) => {
                console.log(response.data)
                this.setState({
                    task: response.data
                })
            })
    }
    render() {
        const { tasks } = this.props
        return (
            <div>
                <ListGroup>
                    {
                        tasks.map((task) => {
                            return <TodoItem key={task._id} task={task}
                                handleDelete={this.props.handleTodoDelete}
                                handleEdit={this.handleEdit}
                            />
                        })
                    }
                </ListGroup>
                <Modal isOpen={this.state.showEdit} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Edit task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={() => this.props.updateTask(this.state.task)}>
                            <Input type='text'
                                value={this.state.task.name}
                                onChange={(e) => this.handleTaskNameChange(e.target.value)} />
                        </Form>



                        <Form onSubmit={this.handleNoteSubmit}>
                            <FormGroup>
                                <Input type='text' placeholder='add notes'
                                    value={this.state.noteText}
                                    onChange={this.handleNoteTextChange}
                                />
                            </FormGroup>
                        </Form>


                        {
                            (this.state.task.notes) ? (
                                <ListGroup flush>
                                    {this.state.task.notes.map((note) => {
                                        return (<ListGroupItem key={note._id}
                                            className='d-flex justify-content-between align-items-center'>
                                            {note.desc} <Button size='sm' color='danger' onClick={() => this.handleNoteDelete(note._id)} >X</Button>
                                        </ListGroupItem>)
                                    })}
                                </ListGroup>) : null
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.toggle}>Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
