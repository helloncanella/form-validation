import React, { Component } from 'react'
import { TweenMax } from "gsap";
import TransitionGroup from 'react-addons-transition-group'

//INCLUDE PROP TYPES!!!!!!!!!!!!!!!!!!

function removeStyles(elements) {
    elements = Array.isArray(elements) ? elements : [elements]
    elements.forEach(e => e.removeAttribute('style'))
}


class Plan extends Component {

    constructor() {
        super()
        this.state = {
            targetAudienceSectionClosed: true,
        }
        this.oldDimmensions = {}
        this.animationDuration = 0.4
    }

    componentDidMount() {
        this.setBackgroundHeight()
    }


    setBackgroundHeight() {
        var self = this

        self.wrapper.style.height = self.wrapper.getBoundingClientRect().height + 'px'

        window.addEventListener('resize', () => {
            self.wrapper.style.height = self.wrapper.getBoundingClientRect().height + 'px'
        })
    }

    enlargeContainer() {
        const rect = this.element.getBoundingClientRect()

        this.oldDimmensions.width = rect.width
        this.oldDimmensions.height = rect.height

        const finalWidth = window.innerWidth * 0.8
            , finalHeight = window.innerHeight * 0.9

        const translationX = window.innerWidth * .2 / 2 - rect.left
            , translationY = window.innerHeight * .1 / 2 - rect.top


        TweenMax.fromTo(this.element, this.animationDuration, { zIndex: 10, position: 'relative' }, { x: translationX, y: translationY, width: finalWidth, height: finalHeight })
    }

    shortContainer() {
        const {width, height} = this.oldDimmensions
        TweenMax.to(this.element, this.animationDuration, {
            x: 0, y: 0, width, height, onComplete: () => removeStyles([this.element])
        })
    }

    openPlan() {
        this.enlargeContainer()
        if (!this.props.isMobile) this.shortSidebar()
    }

    shortSidebar() {
        TweenMax.to(this.sideBar, this.animationDuration, { width: '30%' })
    }

    

    adjustSideBarWidthOnClose() {
        const {width} = this.oldDimmensions
        TweenMax.to(this.sideBar, this.animationDuration, { width: '100%', onComplete: () => removeStyles([this.sideBar]) })
    }

    closePlan() {
        this.shortContainer()
        if (!this.props.isMobile) {
            this.adjustSideBarWidthOnClose()
            this.fillSidebarBackground()
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.opened !== this.props.opened) {
            const {opened} = nextProps

            if (opened) this.openPlan()
            else this.closePlan()
        }
    }

    header() {
        const {name, price, targetAudience} = this.props.planInfo
            , {value, periodicity} = price

        const TargetAudience = this.targetAudience.bind(this)

        return (
            <div className="header">
                <h1>{name}</h1>
                <h2>
                    {value}
                    <span className="periodicity">/{periodicity}</span>
                </h2>
                <hr />
                <TargetAudience />
            </div>
        )
    }

    targetAudience() {
        const
            {targetAudienceSectionClosed} = this.state
            , openAndCloseSection = () => this.setState({ targetAudienceSectionClosed: !targetAudienceSectionClosed })

        const {targetAudience} = this.props.planInfo

        return (
            <div className="target-audience" onClick={openAndCloseSection}>
                <p className="who-is-it-for">
                    <span>+ </span>
                    Who is it for?
                </p>
                {!targetAudienceSectionClosed && <p className="description">{targetAudience}</p>}
            </div>
        )
    }

    render() {

        const {isMobile, opened, planInfo, onChoosePlan, className} = this.props


        const Header = this.header.bind(this)
        const classes = [className, "pricing"].join(" ")

        const features = !(opened && isMobile) && <Features planInfo={planInfo} />
            , selectButton = !opened && <SelectButton onClick={onChoosePlan} />
            , sideBarBackground = opened && <SidebarBackground animationDuration={this.animationDuration}/>
        
        const form = opened && <Form />

        return (
            <div className={classes} ref={e => this.wrapper = e}>
                <div className="content" ref={e => this.element = e}>
                    <div className="plan" ref={e => this.sideBar = e}>
                        <Header />
                        <TransitionGroup>                            
                            {features}
                            {selectButton}
                            
                        </TransitionGroup>
                    </div>
                    <TransitionGroup>
                        {form}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default Plan

class Form extends Component {


    render() {
        return (
            <form>
                <input />
            </form>
        )
    }
}

class SidebarBackground extends Component{
    componentWillEnter(callback) {
        TweenMax.fromTo(this.sidebarBackground, this.animationDuration, { height: 0 }, { height: '30%', onComplete: callback } )
    }

    componentWillLeave() {
        TweenMax.to(this.sidebarBackground, this.animationDuration, { height: 0, onComplete: callback })
    }

    render(){
        return <div className="sidebar-background" ref={e => this.sidebarBackground = e} />
    }
}


class Features extends Component {
    render() {
        const {features} = this.props.planInfo
        return (
            <div className="features">
                <ul>
                    {features.map((feature, index) => <li key={index}>{feature}</li>)}
                </ul>
            </div>
        )
    }
}

class SelectButton extends Component {
    render() {
        return <button ref={e => this.button = e} className="select-button" onClick={this.props.onClick}>Select</button>
    }
}