import React, { Component } from 'react'
import FormWrapper from './Form/FormWrapper.jsx'


export default class LoadContainer extends Component {
    reload() {
        this.formWrapper.setState({ dataWasSent: false })
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
    