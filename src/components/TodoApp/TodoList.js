import React, { Component } from 'react'
import TodoItem from './TodoItem'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap'
import Axios from 'axios'

export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            task: {},
            noteText: ''
        }
    }



    toggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleNoteTextChange = (e) => {
        this.setState({
            noteText: e.target.value
        })
    }

    showNotes = (taskId) => {
        this.setState({
            task: this.props.tasks.find((task) => {
                return task._id === taskId
            })
        })
        this.toggle();
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
                this.setState({
                    task: response.data
                })
            })
    }

    render() {
        const { tasks, handleTaskDelete } = this.props
        return (
            <div>
                <ListGroup className='mt-4'>
                    {
                        tasks.map((task) => {
                            return <TodoItem key={task._id} task={task}
                                handleTaskDelete={handleTaskDelete}
                                showNotes={this.showNotes}
                                itemClick={this.props.itemClick}
                            />
                        })
                    }
                </ListGroup>
                <Modal isOpen={this.state.showModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.state.task.name}
                    </ModalHeader>
                    <ModalBody>
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
                                            {note.desc}
                                            <Button size='sm' color='danger' onClick={() => this.handleNoteDelete(note._id)} >X</Button>
                                        </ListGroupItem>)
                                    })}
                                </ListGroup>) : null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.toggle}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
