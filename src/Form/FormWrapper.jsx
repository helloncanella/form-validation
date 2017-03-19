import React, { Component } from 'react'
import Form from './Whatever.jsx'
import './style.scss'

const fieldSets = [
    {
        name: "email",
        inputs: [{ name: 'email', type: 'text', placeholder: "email" }],
        validator: function () { }
    },

    {
        name: "passwords",
        validator: function () { },
        inputs: [
            { name: 'password', type: 'text', placeholder: "password" },
            { name: 'confirmation', type: 'text', placeholder: "password confirmation" }
        ],
    },

]


export default class FormWrapper extends Component {
    constructor() {
        super()

        this.state = {
            dataWasSent: false,
            validationError: null
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    validateFields(formData) {
        console.log(formData)
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
            fieldSets,
            ref: e => this.form = e
        }
    }

    render() {
        const SentMessage = () => <h1 className="sent">Sent</h1>;
        return this.state.dataWasSent ? <SentMessage /> : <Form {...this.formProps() } />
    }
}

