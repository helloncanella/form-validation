import React, { Component } from 'react'
import Icon from '../reusable-components/IconMock.jsx'
import Badge from '../reusable-components/Badge.jsx'


class ContentMock extends Component {

    render() {
        return (
            <div className='content-mock'>
                <Body />
                <Footer />
            </div>
        )
    }

}

export default ContentMock

class Body extends Component {

    bodyItems(){
        const items = [
            {text: 'Payments', color:'#6772e5'},
            {text: 'Subscriptions', color: '#24b47e'},
            {text: 'Connect', color: '#3297d3', badge: 'new'},
            {text: 'Relay', color: '#e25950'},
            {text: 'Atlas', color: '#e39f48'},
            {text: 'Radar', color: '#b76ac4', badge: 'new'},
        ]

        const components = items.map(({text, color, badge}, index)=>{
            
            const icon = <Icon size={26} color={color} />
                , badgeStyle={
                      background: color
                }

            text = <span style={{color}}>{text}</span>
            badge = badge && <Badge color={color} message={badge} />
            
            return (
                <li className="item" key={index}>
                    {icon}
                    {text}
                    {badge}
                </li>
            )

        }) 

        return <ul className="body-items">{components}</ul> 
    }

    render() {
        const BodyItems = this.bodyItems.bind(this)

        return (
            <div className='body'>
                <h4 className="title">Products</h4>
                <BodyItems />
            </div>
        )
    }

}


class Footer extends Component {

    items(){
        let items = ['Pricing', 'Works with Stripe','Costumers', 'Documentation', 'About Stripe', 'Jobs', 'Blog']
     
        return (
            <ul className="footer-items">
                {items.map((item, index)=><li key={index} className="item">{item}</li>)}
            </ul>
        )
    }

    signin(){
        return (
            <div className="sign-in">
                <h4>Sign in -></h4>       
            </div>
        )
    }

    render() {
        return (
            <div className='footer'>
                {this.items()}
                {this.signin()}
            </div>
        )
    }

}