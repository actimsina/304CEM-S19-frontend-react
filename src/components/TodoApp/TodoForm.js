import React, { Component } from 'react'
import { Form, Input, Button, FormGroup, Label } from 'reactstrap'

export default class TodoForm extends Component {


    render() {
        const { isEdit, taskName, taskDone, categories, categoryId, handleTaskNameChange,
            handleTaskDoneChange, handleTaskAdd, handleTaskUpdate, handleCategoryChange } = this.props
        return (
            <div>
                <Form onSubmit={handleTaskAdd}>
                    <FormGroup>
                        <Input type='text' placeholder='add task'
                            value={taskName}
                            onChange={(e) => handleTaskNameChange(e.target.value)} />
                        <Label for='check' className='ml-4 mt-2'>
                            <Input type='checkbox' id='check'
                                checked={taskDone}
                                onChange={(e) => handleTaskDoneChange(e.target.checked)} /> {' '} is Done?
                        </Label>

                    </FormGroup>

                    <FormGroup>
                        <Label for='category'>Category</Label>
                        <Input type='select' id='category' value={categoryId} onChange={handleCategoryChange}>
                            {
                                categories.map((category) => {
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                })
                            }
                        </Input>
                    </FormGroup>
                    {
                        (isEdit) ? <Button color='success' block
                            onClick={handleTaskUpdate}>Update</Button> :
                            <Button color='primary' block
                                onClick={handleTaskAdd}>Add</Button>
                    }

                </Form>
            </div>
        )
    }
}
