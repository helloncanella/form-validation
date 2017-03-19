import React, { Component } from 'react'
import Form from './Form.jsx'
import './style.scss'

const validateEmail = ({ email }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) throw 'email format is not correct!'
}

const validatePasswords = ({ password, confirmation }) => {
    if (password !== confirmation) throw 'passwords do not match!'
}


const fieldsets = [// {
    //     name: "username",
    //     inputs: [{ name: 'username', type: 'text', placeholder: "username" }],
    //     validator: function ({ username }) { if (!isNaN(username)) { throw 'username cannot be a numbers' } }
    // },
    
    {
        name: "email",
        inputs: [{ name: 'email', type: 'text', placeholder: "email" }],
        validator: validateEmail
    },

    {
        name: "passwords",
        validator: validatePasswords,
        inputs: [
            { name: 'password', type: 'password', placeholder: "password" },
            { name: 'confirmation', type: 'password', placeholder: "password confirmation" }
        ],
    },

]


class FieldsetsValidator {

    verifyIfThereIsInputEmpty(fieldsetsData) {
        let inputsData = []

        fieldsetsData.forEach(({ inputs }) => {
            for (let name in inputs) {
                if (!inputs[name]) throw 'one or more fields are empty'
            }
        })
    }

    validateEachField(data) {
        fieldsets.forEach(({ name, validator: validate }) => {
            const inputsData = data.filter(item => item.name === name)[0].inputs
            if (validate) validate(inputsData)
        })
    }

    validate(data) {
        this.verifyIfThereIsInputEmpty(data)
        this.validateEachField(data)
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

