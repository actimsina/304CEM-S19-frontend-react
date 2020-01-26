import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export default class TodoEdit extends Component {
    render() {
        const { showEdit, toggle, task } = this.props
        return (
            <div>
                <Modal isOpen={showEdit} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Edit task
                    </ModalHeader>
                    <ModalBody>
                        {task.name}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={toggle}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
