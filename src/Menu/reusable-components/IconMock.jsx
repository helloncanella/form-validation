import React, { Component } from 'react'

class IconMock extends Component {

    render() {
        const {size=17, color="#6772e5", margin="-3px 12px 0px 0px"} = this.props 

        const style={
            borderRadius: '50%',
            height: size+'px',
            width: size+'px',
            backgroundColor: color,
            display: 'inline-block',
            margin
        }

        return <span className='icon-mock' style={style} />                    
    }

}

export default IconMock