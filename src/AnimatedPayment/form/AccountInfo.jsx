import React, { Component } from 'react'

import {
    fetchInputsDataFrom,
    removeStyles,
    markInputBorders,
    validateEmail,
    verifyIfFieldsAreEmpty as fieldsAreEmpty
} from '../helpers.js'

class AccountInfo extends Component {

    constructor() {
        super()
        this.state = {
            error: null
        }
    }

    removeStyles() {
        const inputs = Array.from(document.querySelectorAll(".account-info input"))
        removeStyles(inputs)
    }

    setError(message) {
        return this.setState({ error: message })
    }

    fieldsAreEmpty() {
        const fields = this.data

        const anyEmpty = fieldsAreEmpty(fields)
        if(anyEmpty) this.setError('one or more fields are empty')

        return anyEmpty
    }

    passwordsAreTheSame() {
        const passwordsAreTheSame = this.data['password-repetition'] == this.data['password']

        if (!passwordsAreTheSame) {
            markInputBorders(['password', 'password-repetition'])
            this.setError('Passwords don\'t match')
        }

        return passwordsAreTheSame
    }

    emailIsValid() {
        const emailIsValid = validateEmail(this.data["email"])

        if (!emailIsValid) {
            markInputBorders('email')
            this.setError('email format isn\'t correct')
        }

        return emailIsValid
    }

    cleanErrors() {
        this.setState({ error: null })
    }

    validateFields() {
        this.removeStyles()
        const fields = this.data = fetchInputsDataFrom(this.element)

        const fieldsAreCorrect = !this.fieldsAreEmpty() && this.emailIsValid() && this.passwordsAreTheSame()

        if (fieldsAreCorrect) this.cleanErrors()

        return fieldsAreCorrect
    }

    render() {
        return (
            <div className="row account-info" ref={e => this.element = e}>
                <h1 className="small-12 columns">Account Info</h1>
                {this.state.error && <h4 className="error small-12 columns">{this.state.error}</h4>}
                <div className="small-12 medium-6 columns">
                    <label>
                        Name
                        <input type="text" name="name" />
                    </label>
                </div>
                <div className="small-12 medium-6 columns">
                    <label>Email
                            <input name="email" type="text" />
                    </label>
                </div>
                <div className="small-12 medium-6 columns"  >
                    <label>Password
                            <input type="password" name="password" />
                    </label>
                </div>
                <div className="small-12 medium-6 columns"  >
                    <label>Repeat Password
                            <input type="password" name="password-repetition" />
                    </label>
                </div>
            </div>
        )
    }
}

export default AccountInfo