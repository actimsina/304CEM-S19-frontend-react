import React, { Component } from 'react'
import TodoItem from './TodoItem'
import Axios from 'axios'
import NotesModal from './NotesModal'
import { ListGroup } from 'reactstrap'

export default class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            taskId: ''
        }
    }

    toggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    showNotes = (taskId) => {
        this.setState({
            taskId: taskId
        })
        this.toggle();
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

                {
                    this.state.showModal ? (<NotesModal taskId={this.state.taskId}
                        showModal={this.state.showModal}
                        toggle={this.toggle} />) : null
                }


            </div>
        )
    }
}
