import React, { Component } from 'react'
import Navigation from './Navigation'
import Axios from 'axios'
import { Form, FormGroup, Input, Button, Label, CustomInput } from 'reactstrap'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
            uploadedImage: '',
            isUpload: true
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
        alert(e.target.files[0]);
        if (e.target.files[0] !== null) {
            this.setState({
                selectedFile: e.target.files[0],
                isUpload: false
            })
        }

    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                console.log(response.data)

                this.setState({
                    user: { ...this.state.user, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/users/me', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
    }

    handleChange = (e) => {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    render() {
        return (
            <div>
                <Navigation />
                UserProfile Page
                <Form>
                    <FormGroup>
                        <Label for='firstName'>First Name</Label>
                        <Input type='text'
                            id="firstName"
                            name='firstName'
                            value={this.state.user.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Last Name</Label>
                        <Input type='text' id='lastName'
                            name='lastName'
                            value={this.state.user.lastName}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="profilePic">Profile Picture </Label>
                        <img className='img-thumbnail'
                            width='200' src={`http://localhost:3001/uploads/${this.state.user.image}`} alt="profile" />
                        <CustomInput type='file' id='profilePic'
                            onChange={this.handleFileSelect} />
                        <Button color='success' onClick={this.uploadFile} disabled={this.state.isUpload}>Upload Picture</Button>
                    </FormGroup>

                    <Button color='danger' onClick={this.updateUser}>Update User</Button>
                </Form>
            </div>
        )
    }
}
