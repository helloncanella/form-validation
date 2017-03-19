import React, { Component } from 'react'

export default class Badge extends Component {

    style(){
        return {
            display: 'flex',
            alignItems: 'center',
            marginLeft: '5px',
            verticalAlign: '2px',
            color: '#fff',
            textTransform: 'uppercase',
            fontSize: '10px',
            lineHeight: '14px',
            fontWeight: 700,
            borderRadius: '10px',
            padding: '0 5px',
            background: this.props.color || 'red',
                    
        }
    }

    render() {
        const {message='new'} = this.props
        return <span className="badge" style={this.style()}>{message}</span>
    }

}