import React, { Component } from 'react'
import Navigation from './Navigation'
import { Form, FormGroup, Input, Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import Axios from 'axios'

export default class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categoryName: '',
            categories: [],
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
        Axios.post(`http://localhost:3001/categories`,
            { name: this.state.categoryName }, this.state.config)
            .then((response) => {
                this.setState({
                    categories: [...this.state.categories, response.data],
                    categoryName: ''
                })
            }).catch((err) => console.log(err.response));
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
                                    {category.name}
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
