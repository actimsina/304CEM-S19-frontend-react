import React, { Component } from 'react'
import Navigation from './Navigation'
import Axios from 'axios'
import { Form, FormGroup, Input, Button } from 'reactstrap'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
            uploadedImage: ''

        }
    }


    componentDidMount() {
        Axios.get('http://localhost:3001/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    handleFileSelect = (e) => {
        console.log(e.target.files[0])

        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                console.log(response.data)

                this.setState({
                    user: { ...this.state.user, image: response.data.filename },
                    uploadedImage: response.data.filename
                })


            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/users/me', { image: this.state.user.image }, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div>
                <Navigation />
                UserProfile Page
                <Form>
                    <FormGroup>
                        <Input type='file' onChange={this.handleFileSelect} />
                        <Button color='primary' onClick={this.uploadFile}>Upload</Button>
                    </FormGroup>

                    <img src={`http://localhost:3001/uploads/${this.state.user.image}`} alt="profile image" />
                    <Button color='danger' onClick={this.updateUser}>Update User</Button>
                </Form>
            </div>
        )
    }
}
