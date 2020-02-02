import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
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

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/profile'> Profile </Link>
                <Button color='warning' onClick={this.handleLogout}> Logout</Button>
            </div>
        )
    }
}

export default withRouter(Navigation)

