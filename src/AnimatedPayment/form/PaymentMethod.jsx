import React, { Component } from 'react'
import { TweenMax } from "gsap";
import TransitionGroup from 'react-addons-transition-group'
import { fetchInputsDataFrom, verifyIfFieldsAreEmpty as fieldsAreEmpty, removeStyles } from '../helpers.js'

class PaymentMethod extends Component {

    constructor() {
        super()
        this.state = {
            paymentSelected: 'paypal',
            error: null
        }
    }

    selectPaymentMethod(e) {
        this.setState({ paymentSelected: e.currentTarget.value, error: null })
    }

    removeStyles() {
        const inputs = Array.from(document.querySelectorAll(".payment-methods input"))
        removeStyles(inputs)
    }

    setError(message) {
        return this.setState({ error: message })
    }

    cleanErrors() {
        this.setState({ error: null })
    }

    validateFields() {
        this.removeStyles()

        const fields = this.data = fetchInputsDataFrom(this.element)
            , fieldsAreCorrect = !fieldsAreEmpty(fields)

        if (fieldsAreCorrect) this.cleanErrors()
        else this.setError('one or more fields are empty')

        return fieldsAreCorrect
    }

    methods() {
        return (
            <div className="methods">
                <div className="row">
                    <h1 className="small-12 columns">Payment Method</h1>
                    {this.state.error && <h4 className="error small-12 columns">{this.state.error}</h4>}
                    <div className="small-12 columns ">
                        <input type="radio" name="payment-method" value="paypal" id="paypal" checked={this.state.paymentSelected === 'paypal'} onChange={this.selectPaymentMethod.bind(this)} />
                        <label htmlFor="paypal">Paypal</label>
                        <input type="radio" name="payment-method" value="card" id="card" value="card" checked={this.state.paymentSelected === 'card'} onChange={this.selectPaymentMethod.bind(this)} />
                        <label htmlFor="card">card</label>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const Methods = this.methods.bind(this)

        return (
            <div className="payment-methods" ref={e => this.element = e}>
                <Methods />
                <TransitionGroup>
                    {this.state.paymentSelected == 'card' && <CreditCardForm />}
                </TransitionGroup>
            </div>
        )
    }
}

class CreditCardForm extends Component {

    componentWillEnter(callback) {
        const height = this.creditCardForm.getBoundingClientRect().height
        TweenMax.fromTo(this.creditCardForm, 0.6, { height: 0, opacity: 0 }, { height, opacity: 1, onComplete: callback })
    }

    componentWillLeave(callback) {
        TweenMax.to(this.creditCardForm, 0.6, { height: 0, opacity: 0, onComplete: callback })
    }

    render() {
        return (
            <div className="credit-card-form row " ref={e => this.creditCardForm = e}>
                <div className="small-12 medium-6 columns">
                    <label>Card Number
                        <input type="number" name="card-number" />
                    </label>
                </div>
                <div className="small-6 columns">
                    <label>Card CVC
                        <input type="number" name="card-cvc" />
                    </label>
                </div>
                <div className="small-12 columns row expiration-date">
                    <label className="small-12 columns">Expiration Date</label>
                    <div className="small-6 medium-2 columns">
                        <input type="number" placeholder="MM" name="expiration-month" />
                    </div>
                    <div className="small-6 medium-4 columns"    >
                        <input type="number" placeholder="YYYY" name="expiration-year" />
                    </div>
                </div>

            </div>

        )
    }
}

export default PaymentMethod