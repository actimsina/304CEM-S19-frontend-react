import React, { Component } from 'react'
import { Form, Input, Button, FormGroup } from 'reactstrap'

export default class TodoForm extends Component {


    render() {
        const { currentTodo, handleCurrentTodoChange, handleTodoSubmit } = this.props
        return (
            <div>
                <Form onSubmit={handleTodoSubmit}>
                    <FormGroup>
                        <Input type='text' placeholder='add todo'
                            value={currentTodo}
                            onChange={(e) => handleCurrentTodoChange(e.target.value)} />
                    </FormGroup>
                    <Button block color='primary'>Add</Button>
                </Form>
            </div>
        )
    }
}
