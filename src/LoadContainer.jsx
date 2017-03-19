import React, { Component } from 'react'
import FormWrapper from './Form/refactored-form/FormWrapper.jsx'

export default class LoadContainer extends Component {  
    reload() {
        this.formWrapper.setState({ dataWasSent: false, validationError: null })
    }

    render() {
        return (
            <div className='load-container'>
                <button onClick={this.reload.bind(this)}>RELOAD!</button>
                <FormWrapper ref={e => this.formWrapper = e} />
            </div>
        )

    }

}
