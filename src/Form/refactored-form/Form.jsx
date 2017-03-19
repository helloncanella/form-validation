import React, { Component } from 'react'


export default class Form extends Component {
    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    //public method
    getData() {
        return this.data
    }


    fetchData() {
        let data = []

        const fieldsets = this.form.querySelectorAll("fieldset")

        fieldsets.forEach(fieldset => {
            const { name } = fieldset

            data.push({ 
                name, 
                inputs: this.fetchInputsData(fieldset) 
            })
        })

        return data
    }

    fetchInputsData(fieldset) {
        var data = {}

        var inputs = fieldset.querySelectorAll('input:not(*[type="submit"])')
        inputs.forEach(({ name, value }) => data[name] = value)

        return data
    }

    renderFieldsets() {
        const { fieldsets } = this.props

        return fieldsets.map(({ name, inputs }, index) => {
            return <fieldset name={name} key={index}>{this.renderInputs(inputs)}</fieldset>
        })
    }

    renderInputs(inputs) {
        return inputs.map((inputProps, index) => {
            return <input {...inputProps} key={index} />
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.data = this.fetchData()
        this.props.onSubmit()
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