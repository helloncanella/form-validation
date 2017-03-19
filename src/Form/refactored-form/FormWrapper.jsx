import React, { Component } from 'react'
import Form from './Form.jsx'
import fieldsets from './fieldsets.js'
import FieldsetsValidator from './fieldsets-validator.js'
import './style.scss'

class FormWrapper extends Component {
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
        /***
            SENDING ALGORITHM!!!!!!!!!
        **/

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

export default FormWrapper
