import React, { Component } from 'react'
import { TweenMax} from "gsap";
import TransitionGroup from 'react-addons-transition-group'
import Plan from './Plan.jsx'
import MembershipBenefits from './MembershipBenefits.jsx'
import GSAP from 'react-gsap-enhancer'

//move to a json
import plans from './plans.js'

class AnimatedSignup extends Component {
    render() {
        return (
            <div className="animated-signup">
                <MembershipBenefits />
                <Plans />
            </div>
        )
    }
}

export default GSAP()(AnimatedSignup)

class Plans extends Component {

    constructor() {
        super()
        this.state = {
            selectedPlan: null,
            isMobile: false
        }
        this.animationDuration = 0.4
    }

    componentDidMount() {
        this.verifyIfIsMobile()
        window.addEventListener('resize', function () {
            this.verifyIfIsMobile.call(this)
        }.bind(this))
    }

    verifyIfIsMobile() {
        this.setState({ isMobile: window.innerWidth < 768 && true })
    }

    choosePlan(name) {
        this.setState({ selectedPlan: name })
    }

    unselectPlan() {
        this.setState({ selectedPlan: null })
    }

    render() {
        const components = plans.map((plan, index) => {

            const {name} = plan

            const properties = {
                onChoosePlan: this.choosePlan.bind(this, name),
                planInfo: Object.assign({}, plan),
                key: name,
                animationDuration: this.animationDuration,
                isMobile: this.state.isMobile
            }

            return (
                <div className="small-10 medium-4 large-4 columns" key={index}>
                    <Plan {...properties} opened={this.state.selectedPlan === name} />
                </div>
            )

        }, this)


        return (
            <div className="plans">
                <div className="row align-center">
                    {components}
                </div>
                <TransitionGroup>
                    {this.state.selectedPlan && <Background animationDuration={this.animationDuration} onClick={this.unselectPlan.bind(this)} />}
                </TransitionGroup>
            </div>
        )
    }
}

class Background extends Component {
    lockBodyScroll(){
        document.querySelector('body').style.overflowY = 'hidden'
    }

    unLockBodyScroll(){
        document.querySelector('body').removeAttribute('style')
    }

    componentWillEnter(callback) {
        this.lockBodyScroll()
        TweenMax.fromTo(this.background, 0.3, { opacity: 0 }, { opacity: 1, onComplete: callback })
    }
    componentWillLeave(callback) {
        this.unLockBodyScroll()
        TweenMax.to(this.background, 0.3, { opacity: 0, onComplete: callback })
    }
    
    render() {
        return <div className="background" ref={e => this.background = e} onClick={this.props.onClick} />
    }
}