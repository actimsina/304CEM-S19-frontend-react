import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, Button, Input, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap'
import Axios from 'axios'

export default class NotesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: {},
            noteDesc: '',
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:3001/tasks/${this.props.taskId}`,
            this.state.config).then((response) => {
                this.setState({
                    task: response.data
                })
            }).catch((err) => { console.log(err) })
    }

    handleNoteDescChange = (e) => {
        this.setState({
            noteDesc: e.target.value
        })
    }

    handleNoteSubmit = (e) => {
        e.preventDefault();
        Axios.post(`http://localhost:3001/tasks/${this.props.taskId}/notes`,
            { desc: this.state.noteDesc }, this.state.config)
            .then((response) => {
                this.setState({
                    task: response.data,
                    noteDesc: ''
                })
            }).catch((err) => console.log(err))
    }

    handleNoteDelete = (noteId) => {
        Axios.delete(`http://localhost:3001/tasks/${this.props.taskId}/notes/${noteId}`,
            this.state.config).then((response) => {
                this.setState({
                    task: response.data
                })
            })
    }

    render() {
        const { toggle, showModal } = this.props
        return (
            <div>
                <Modal isOpen={showModal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        {
                            (this.state.task.done) ? <del>{this.state.task.name}</del> : <span>{this.state.task.name}</span>
                        }
                    </ModalHeader>
                    <ModalBody>

                        <Form onSubmit={this.handleNoteSubmit}>
                            <FormGroup>
                                <Input type='text' placeholder='add notes'
                                    value={this.state.noteDesc}
                                    onChange={this.handleNoteDescChange}
                                />
                            </FormGroup>
                        </Form>

                        {
                            (this.state.task.notes) ? (
                                <ListGroup flush>
                                    {this.state.task.notes.map((note) => {
                                        return (<ListGroupItem key={note._id}
                                            color='info'
                                            className='d-flex justify-content-between align-items-center'>
                                            {note.desc}
                                            <Button size='sm' color='danger' onClick={() => this.handleNoteDelete(note._id)}>Del</Button>
                                        </ListGroupItem>)
                                    })}
                                </ListGroup>) : null
                        }
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
