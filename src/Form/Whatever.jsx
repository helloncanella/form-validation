import React, { Component } from 'react'


export default class Form extends Component {
    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    fetchData() {
        var data = []

        var elements = this.form.querySelectorAll('input:not(*[type="submit"])')

        elements.forEach(({ name, value, type, checked }) => {
            data[name] = value
        })

        return data
    }

    getData() {
        return this.data
    }

    onSubmit(e) {
        e.preventDefault()

        this.data = this.fetchData()
        this.props.onSubmit()
    }

    renderFieldsets() {
        const { fieldSets } = this.props

        return fieldSets.map(({ name, inputs }, index) => {
            return <fieldset name={name} key={index}>{this.renderInputs(inputs)}</fieldset>
        })

    }

    renderInputs(inputs) {
        return inputs.map((inputProps, index) => {
            return <input {...inputProps} key={index} />
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} ref={e => this.form = e}>
                <h1>A beautiful form</h1>
                <div className="content">
                    <h4 className="error">{this.props.validationError}</h4>
                    {this.renderFieldsets()}
                    <input type="submit" />
                </div>
            </form>
        )
    }
}