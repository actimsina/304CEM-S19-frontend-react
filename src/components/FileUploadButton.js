import React, { Component } from 'react'
import { Button } from 'reactstrap'

export default class FileUploadButton extends Component {
    render() {
        return (
            <Button color='success' onClick={this.props.uploadFile} block>Upload Picture</Button>
        )
    }
}
