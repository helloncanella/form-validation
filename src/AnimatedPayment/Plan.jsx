import React, { Component, PropTypes } from 'react'
import { TweenMax, Expo } from "gsap";
import TransitionGroup from 'react-addons-transition-group'
import { triggerWhenResizeEnds, removeStyles } from './helpers.js'
import Form from './form/Form.jsx'

class Plan extends Component {
    constructor() {
        super()

        this.state = {
            targetAudienceSectionClosed: true,
        }

        this.oldDimmensions = {}
        this.animationDuration = 0.5

        this.setWrapperHeight = this.setWrapperHeight.bind(this)
        this.resizeAll = this.resizeAll.bind(this)

    }

    storeWindowDimmensions() {
        this.lastWindowHeight = window.innerHeight
        this.lastWindowWidth = window.innerWidth
    }

    mobileKeyboardAppears() {
        const screenHeightChanged = !!(window.innerHeight - this.lastWindowHeight)
            , screenWidthChanged = !!(window.innerWidth - this.lastWindowWidth)

        const {isMobile} = this.props

        return isMobile && !screenWidthChanged && screenHeightChanged
    }

    shouldComponentUpdate(nextProps, nextState) {
        const togglingPlan = nextProps.opened !== this.props.opened
            , togglingSection = nextState.targetAudienceSectionClosed !== this.state.targetAudienceSectionClosed

        if (togglingPlan || togglingSection) return true

        return false
    }

    componentDidMount() {
        this.storeWindowDimmensions()
        this.setWrapperHeight()
        this.activeResizeListener()
    }

    activeResizeListener() {
        const {setWrapperHeight, resizeAll} = this
            , {opened} = this.props
            , self = this

        const callback = () => {
            setWrapperHeight()

            if (self.props.opened && !self.mobileKeyboardAppears()) resizeAll()

            self.storeWindowDimmensions()
            self.forceUpdate()
        }

        triggerWhenResizeEnds(callback)
    }

    resizeAll() {
        removeStyles([this.sideBar, this.element])
        this.adjustContainer(0)
        if (!this.props.isMobile) this.adjustSideBar(0)
    }

    adjustSideBar(animationDuration) {
        animationDuration = !isNaN(animationDuration) ? animationDuration : this.animationDuration
        TweenMax.to(this.sideBar, animationDuration, { zIndex: 10, width: '30%', float: 'left' })
    }

    setWrapperHeight() {
        const {wrapper} = this
        wrapper.style.height = wrapper.getBoundingClientRect().height + 'px'
    }

    componentWillUpdate(nextProps) {
        if (nextProps.opened !== this.props.opened) {
            const {opened} = nextProps

            if (opened) this.open()
            else this.close()
        }
    }


    open() {
        this.animateContainer().open()
        if (!this.props.isMobile) this.animateSidebar().open()
    }

    close() {
        this.animateContainer().close()
        if (!this.props.isMobile) {
            this.animateSidebar().close()
        }
    }


    animateContainer() {
        const {width, height} = this.oldDimmensions
        return {
            open: () => this.adjustContainer.call(this),
            close: () => TweenMax.to(this.element, this.animationDuration, { x: 0, y: 0, width, height, onComplete: () => removeStyles(this.element) })
        }
    }


    animateSidebar() {
        const {width} = this.oldDimmensions

        return {
            open: this.adjustSideBar.bind(this),
            close: () => TweenMax.to(this.sideBar, this.animationDuration, { width: '100%', onComplete: () => removeStyles(this.sideBar) }),
        }
    }

    adjustContainer(animationDuration) {
        //SIMPLIFY!!!!!
        const rect = this.element.getBoundingClientRect()

        this.oldDimmensions.width = rect.width
        this.oldDimmensions.height = rect.height

        const finalWidth = window.innerWidth * 0.8
            , finalHeight = window.innerHeight * 0.9

        const translationX = window.innerWidth * .2 / 2 - rect.left
            , translationY = window.innerHeight * .1 / 2 - rect.top

        animationDuration = !isNaN(animationDuration) ? animationDuration : this.animationDuration

        TweenMax.fromTo(this.element, animationDuration, { zIndex: 10, position: 'relative' }, { x: translationX, y: translationY, width: finalWidth, height: finalHeight })
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

    needHelp() {
        return (
            <div className="need-help">
                <h5>Need Help?</h5>
                <p className="text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque perferendis ad porro, ipsam, distinctio quam ex adipisci accusamus iusto eum sed deleniti fuga nam assumenda.
                </p>
            </div>
        )
    }

    render() {

        const {isMobile, opened, planInfo, onChoosePlan, className} = this.props

        const Header = this.header.bind(this)
        const classes = [className, "pricing"].join(" ")

        const features = !(opened && isMobile) && <Features planInfo={planInfo} />
            , selectButton = !opened && <SelectButton onClick={onChoosePlan} />
            , sidebarBackground = opened && !isMobile && <SidebarBackground />
        // , needHelp = opened && !isMobile && this.needHelp()

        const form = opened && <Form />

        return (
            <div className={classes} ref={e => this.wrapper = e}>
                <div className="content" ref={e => this.element = e}>
                    <div className="plan" ref={e => this.sideBar = e}>
                        <Header />
                        <TransitionGroup>
                            {features}
                            {selectButton}
                            {sidebarBackground}
                        </TransitionGroup>
                    </div>
                    <TransitionGroup className="form-container">
                        {form}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default Plan

Plan.propTypes = {
    onChoosePlan: PropTypes.func.isRequired,
    planInfo: PropTypes.object.isRequired,
    isMobile:  PropTypes.bool.isRequired
}


class SidebarBackground extends Component {
    componentWillEnter(callback) {
        TweenMax.fromTo(this.sidebarBackground, 1, { height: 0 }, { height: '100%', ease: Expo.easeOut, onComplete: callback })
    }
    componentWillLeave(callback) {
        TweenMax.to(this.sidebarBackground, 0.4, { height: 0, onComplete: callback })
    }
    render() {
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

