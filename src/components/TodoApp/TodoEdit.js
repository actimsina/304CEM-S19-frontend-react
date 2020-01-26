import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap'

export default class TodoEdit extends Component {

    handleSubmit = (e) => {
        this.props.toggle();
        this.props.updateTask(this.props.task);
    }

    render() {
        const { showEdit, toggle, task } = this.props
        return (
            <React.Fragment>
                <Modal isOpen={showEdit} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Edit task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type='text'
                                    value={task.name}
                                    onChange={(e) => this.props.handleTaskNameChange(e.target.value)} />
                                <Label for='check' className='ml-4'>
                                    <Input type='checkbox'
                                        checked={task.done}
                                        onChange={(e) => this.props.handleTaskDoneChange(e.target.checked)} /> {' '}
                                    is Done?
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}
