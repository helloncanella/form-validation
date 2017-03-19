import React, { Component } from 'react'

const benefits = [
    '* Continuing Education (Coaching Conference, Professional Development Courses)',
    '* Practice Development (Discounted Courses – NBI, Hogan, CWQ, etc.)',
    '* Thought Leadership (Conference, Website access – can we consider library access?)',
    '* Recognition as a global community of preeminent executive and organizational coaches&nbsp;',
    '* Peer Coaching, consulting and case supervision opportunities',
]

class MembershipBenefits extends Component {

    constructor() {
        super()
        this.state = {
            opened: false
        }
    }

    render() {
        const toggleSection = () => { this.setState({ opened: !this.state.opened }) }
            , benefitsList = benefits.map((benefit, index) => <li key={index}>{benefit}</li>)

        return (
            <div className='benefits-membership row align-center' onClick={toggleSection}>
                <div className="small-10 medium-7 large-12 columns">
                    <h1 className="title">
                        <span>+ </span>
                        Membership Benefits
                    </h1>
                    {this.state.opened && <ul>{benefitsList}</ul>}
                </div>
            </div>
        )

    }

}

export default MembershipBenefits



