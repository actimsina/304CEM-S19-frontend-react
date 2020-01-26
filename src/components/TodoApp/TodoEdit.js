import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap'

export default class TodoEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updatedTaskName: '',
            updatedTaskDone: false
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            updatedTaskName: newProps.task.name,
            updatedTaskDone: newProps.task.done
        })
    }


    handleChange = (e) => {
        const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value

        this.setState({
            [e.target.name]: value
        })
    }



    handleSubmit = (e) => {
        this.props.toggle();
        this.props.updateTask(this.props.task._id, this.state.updatedTaskName, this.state.updatedTaskDone);
    }

    render() {
        const { showEdit, toggle } = this.props
        return (
            <div>
                <Modal isOpen={showEdit} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Edit task
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type='text' name='updatedTaskName'
                                    value={this.state.updatedTaskName}
                                    onChange={this.handleChange} />
                                <Label for='check' className='ml-4'>
                                    <Input type='checkbox' name='updatedTaskDone'
                                        checked={this.state.updatedTaskDone}
                                        onChange={this.handleChange} /> {' '}
                                    is Done?
                                </Label>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
