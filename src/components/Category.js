import React, { Component } from 'react'
import Navigation from './Navigation'
import { Form, FormGroup, Input, Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Axios from 'axios'

export default class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoryId: '',
            categoryName: '',
            categories: [],
            isUpdate: false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/categories', this.state.config)
            .then((response) => {
                this.setState({
                    categories: response.data
                })
            }).catch((err) => console.log(err.response))
    }

    handleCategoryChange = (e) => {
        this.setState({
            categoryName: e.target.value
        })
    }

    submitCategory = (e) => {
        e.preventDefault()
        if (this.state.categoryName === '') {
            this.setState({
                isUpdate: false
            })
            return
        }
        if (this.state.isUpdate) {
            Axios.put(`http://localhost:3001/categories/${this.state.categoryId}`,
                { name: this.state.categoryName }, this.state.config)
                .then((response) => {
                    const updatedCategories = this.state.categories.map((category) => {
                        if (category._id === this.state.categoryId) {
                            category.name = this.state.categoryName
                        }
                        return category
                    })
                    this.setState({
                        categories: updatedCategories,
                        categoryName: '',
                        isUpdate: false
                    })
                }).catch((err) => console.log(err.response))

        } else {
            Axios.post(`http://localhost:3001/categories`,
                { name: this.state.categoryName }, this.state.config)
                .then((response) => {
                    this.setState({
                        categories: [...this.state.categories, response.data],
                        categoryName: ''
                    })
                }).catch((err) => console.log(err.response));
        }
    }

    deleteCategory = (categoryId) => {
        Axios.delete(`http://localhost:3001/categories/${categoryId}`, this.state.config)
            .then((response) => {
                const filteredCategories = this.state.categories.filter((category) => {
                    return category._id !== categoryId
                })
                this.setState({
                    categories: filteredCategories
                })
            }).catch((err) => console.log(err.response));
    }

    handleEdit = (categoryId) => {
        const choice = this.state.categories.find((category => category._id === categoryId))
        this.setState({
            categoryName: choice.name,
            categoryId: categoryId,
            isUpdate: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container>
                    <Form onSubmit={this.submitCategory}>
                        <FormGroup>
                            <Input type='text'
                                placeholder='add category'
                                value={this.state.categoryName}
                                onChange={this.handleCategoryChange}
                            />
                        </FormGroup>
                    </Form>

                    <ListGroup>
                        {
                            this.state.categories.map((category) => {
                                return (<ListGroupItem key={category._id} color='info' className='d-flex justify-content-between align-items-center'>
                                    <div onClick={() => this.handleEdit(category._id)}>{category.name}</div>
                                    <Button color='danger' size='sm' onClick={() => this.deleteCategory(category._id)}>Delete</Button>
                                </ListGroupItem>)
                            })
                        }
                    </ListGroup>
                </Container>
            </React.Fragment>
        )
    }
}
