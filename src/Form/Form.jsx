import React, { Component } from 'react'
import './style.scss'

export default class Form extends Component {
    constructor() {
        super()
        this.state = {
            sentData: false
        }
        this.validateFields = this.validateFields.bind(this)
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateFields(username, email, password, confirmationPassword) {

        if (!(username && email && password && confirmationPassword)) {
            this.setState({ error: 'one or more fields are empty' })
            return false;
        } else if (password !== confirmationPassword) {
            this.setState({ error: 'passwords don\'t match' })
            return false;
        } else if (!this.validateEmail(email)) {
            this.setState({ error: 'email format is not correct' })
            return false;
        }

        return true;
    }

    fetchData() {
        var data = []

        var elements = this.form.querySelectorAll('input:not(*[type="submit"])')

        elements.forEach(({ name, value, type, checked }) => {
            data[name] = value
        })

        return data
    }

    send(data){
        //send data algorithm
        this.setState({sentData: true})
    }

    onSubmit(e) {
        e.preventDefault()

        var data = this.fetchData()
        var email = data.email
        var password = data.password
        var confirmationPassword = data['password-confirmation']
        var username = data.username
       

        if (this.validateFields(username, email, password, confirmationPassword)) {
            this.send(data) 
        }
    }

    render() {
        return (
            this.state.sentData ?
                <h1 className="sent">Sent</h1>
                :
                <div className="form-wrapper">
                    <h1>A beautiful form</h1>
                    <form onSubmit={this.onSubmit.bind(this)} ref={e => this.form = e}>
                        <div className="content">
                            <h4 className="error">{this.state.error}</h4>
                            <input type="text" name="username" placeholder="username" />
                            <input type="text" name="email" placeholder="email"/>
                            <input type="password" name="password" placeholder="password" />
                            <input type="password" name="password-confirmation" placeholder="password confirmation" />
                            <input type="submit" />
                        </div>
                    </form>
                </div>
        )
    }
}