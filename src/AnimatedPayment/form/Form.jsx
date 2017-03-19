import React, { Component } from 'react'
import { TweenMax } from "gsap";
import TransitionGroup from 'react-addons-transition-group'
import PaymentMethod from './PaymentMethod.jsx'
import AccountInfo from './AccountInfo.jsx'
import {
    fetchInputsDataFrom,
    removeStyles,
    markInputBorders,
    validateEmail,
    verifyIfFieldsAreEmpty as fieldsAreEmpty
} from '../helpers.js'

class Form extends Component {

    constructor() {
        super()
        this.fieldsets = {}
    }

    componentWillEnter(callback) {
        TweenMax.fromTo(this.form, 0.5, { y: -30000000, opacity: 0, delay: 100 }, { y: 0, opacity: 1, onComplete: callback })
    }

    componentWillLeave(callback) {
        TweenMax.to(this.form, 0.1, { opacity: 0, onComplete: callback })
    }

    validateFields() {
        let fieldsAreCorrect = true

        for (let key in this.fieldsets) {
            fieldsAreCorrect = fieldsAreCorrect && this.fieldsets[key].validateFields()
        }

        return fieldsAreCorrect
    }

    doWhateverYouWant() {
        alert('CHECK THE CONSOLE!')
        console.log('form data:', this.form.data)
    }

    fetchFormData() {
        this.form.data = {}

        for (let key in this.fieldsets) {
            this.form.data[key] = Object.assign({}, this.fieldsets[key].data)
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const fieldAreValidated = this.validateFields()

        if (fieldAreValidated) {
            this.fetchFormData()
            this.doWhateverYouWant() //Finn: you are free to rename this action
        }

    }

    submitButton() {
        return (
            <div className="row submit-button">
                <div className="small-6 columns"></div>
                <div className="small-6 columns">
                    <button type="submit">get started</button>
                </div>
            </div>
        )
    }

    render() {
        const SubmitButton = this.submitButton.bind(this)

        return (
            <form className="form" ref={e => this.form = e} onSubmit={this.onSubmit.bind(this)}>
                <AccountInfo ref={e => this.fieldsets['accountInfo'] = e} />
                <PaymentMethod ref={e => this.fieldsets['paymentMethod'] = e} />
                <SubmitButton />
            </form>
        )
    }
}

export default Form




