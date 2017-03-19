import React, { Component } from 'react'
import Form from './Whatever.jsx'
import './style.scss'

const fieldsets = [
    {
        name: "email",
        inputs: [{ name: 'email', type: 'text', placeholder: "email" }],
        validator: function () { }
    },

    {
        name: "passwords",
        validator: function () { },
        inputs: [
            { name: 'password', type: 'password', placeholder: "password" },
            { name: 'confirmation', type: 'password', placeholder: "password confirmation" }
        ],
    },

]


class FieldsetsValidator {
    verifyIfThereIsInputEmpty() {

    }

    validate(data) {
        console.log(data)
        this.verifyIfThereIsInputEmpty(data)
        throw 'piuxinho'
    }
}


export default class FormWrapper extends Component {
    constructor() {
        super()

        this.state = {
            dataWasSent: false,
            validationError: null
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    setError(error) {
        this.setState({ validationError: error })
    }

    validateFields(formData) {
        const validator = new FieldsetsValidator()

        try {
            validator.validate(formData)
        } catch (error) {
            this.setError(error)
            return false
        }

        return true;

    }

    sendData() {
        //Send algorithm
        this.setState({ dataWasSent: true })
    }

    onSubmit() {
        const formData = this.form.getData();
        this.validateFields(formData) && this.sendData(formData)
    }

    formProps() {
        return {
            onSubmit: this.onSubmit,
            validationError: this.state.validationError,
            fieldsets,
            ref: e => this.form = e
        }
    }

    render() {
        const SentMessage = () => <h1 className="sent">Sent</h1>;
        return this.state.dataWasSent ? <SentMessage /> : <Form {...this.formProps() } />
    }
}

