import React, { Component, PropTypes } from 'react'
import menuItems from './menu-components/index.js'
import TransitionGroup from 'react-addons-transition-group'
import { TweenMax, TimelineMax } from "gsap"
import { clientRect, isMouseOn, triggerWhenResizeEnds, removeStyles, } from '../helpers.js'

window.menuItems = menuItems

class DesktopMenu extends Component {
    constructor() {
        super()
        this.state = {
            itemActive: '',
            selectedItemPosition: {},
            dropdownBoxInfo: null
        }
    }

    componentDidMount() {
        triggerWhenResizeEnds(this.desactive.bind(this))
    }

    active(itemActive, selectedItemPosition) {
        this.setState({ itemActive, selectedItemPosition })
    }

    desactive() {
        this.setState({ itemActive: '', dropdownBoxInfo: null })
    }

    grabDropdownBoxInfo(dropdownBoxInfo) {
        this.setState({ dropdownBoxInfo })
    }

    itemsProps() {
        return {
            itemActive: this.state.itemActive,
            onHover: this.active.bind(this),
            onMouseLeave: this.desactive.bind(this),
            grabDropdownBoxInfo: this.grabDropdownBoxInfo.bind(this)
        }
    }

    dropdownProps() {
        const {itemActive, selectedItemPosition, dropdownBoxInfo} = this.state

        return {
            itemActive,
            selectedItemPosition,
            dropdownBoxInfo,
            onMouseLeave: this.desactive.bind(this),
        }
    }

    markerProps() {
        const {itemActive, selectedItemPosition} = this.state

        return {
            itemActive,
            selectedItemPosition
        }
    }

    render() {
        const dropdownContentIsActive = !!(this.state.itemActive && this.state.dropdownBoxInfo)

        return (
            <div className='desktop-menu row align-start'>
                <Items className="menu-items" {...this.itemsProps() } />
                <TransitionGroup component="div" >
                    {dropdownContentIsActive && <Marker {...this.markerProps() } />}
                    {dropdownContentIsActive && <DropdownBackground className="dropdown-background" {...this.dropdownProps() } />}
                </TransitionGroup>
            </div>
        )
    }
}


export default DesktopMenu

class Marker extends Component {

    calculateTranslation() {
        const {selectedItemPosition} = this.props

        const x = selectedItemPosition.xCenter
            , y = selectedItemPosition.bottom

        return { x, y }
    }

    slide() {
        const {x, y} = this.calculateTranslation()
        TweenMax.to(this.marker, 0.3, { x, y })
    }

    componentDidUpdate(prevProps, prevStates) {
        const {itemActive} = this.props
        if (itemActive && itemActive !== prevProps.itemActive) this.slide()
    }

    componentWillEnter(callback) {
        const {x, y} = this.calculateTranslation()

        let initial = { opacity: 0, position: 'fixed', top: 3, left: -6, width: 12, height: 12, x, y }
            , final = { opacity: 1, onComplete: callback }

        TweenMax.fromTo(this.marker, 0.3, initial, final)
    }

    componentWillLeave(callback) {
        TweenMax.to(this.marker, 0.3, { opacity: 0, onComplete: callback })
    }

    render() {
        return <div className='marker' ref={e => this.marker = e} />
    }

}

class DropdownBackground extends Component {

    calculateTranslation() {
        const {dropdownBoxInfo} = this.props

        // initial positon is set to left:0 and top:0, initially
        const translationX = dropdownBoxInfo.left - 0
            , translationY = dropdownBoxInfo.top - 0

        return { x: translationX, y: translationY }
    }

    calculateFooterTranslation() {
        const {footerTop} = this.props.dropdownBoxInfo
        const translationY = footerTop - this.footerInitialTop

        return translationY
    }

    slide() {
        const {x, y} = this.calculateTranslation()
        return TweenMax.to(this.dropdownBackground, 0.3, { x, y })
    }

    animateSize() {
        const {height, width} = this.props.dropdownBoxInfo
        return TweenMax.to(this.dropdownBackground, 0.3, { height, width })
    }

    animateFooter() {
        const footerTranslation = this.calculateFooterTranslation()
        return TweenMax.to(this.footerBackground, 0.3, { y: footerTranslation })
    }

    adjustFooterPosition() {
        this.footerInitialTop = this.props.dropdownBoxInfo.top
        const footerTranslation = this.calculateFooterTranslation()
        TweenMax.set(this.footerBackground, { y: footerTranslation })
    }

    componentWillEnter(callback) {
        const {width, height, footerTop, left, top} = this.props.dropdownBoxInfo

        const initial = {
            position: 'absolute', top: 0, left: 0,
            x: left, y: top,
            width, height,
            transformOrigin: '50% -50px',
            rotationX: -15,
            opacity: 0
        }

        const final = {
            rotationX: 0,
            opacity: 1,
            onComplete: callback
        }

        TweenMax.fromTo(this.dropdownBackground, 0.3, initial, final)

        this.adjustFooterPosition()
    }

    componentWillLeave(callback) {
        let final = { rotationX: -15, opacity: 0 }

        final.onComplete = callback

        TweenMax.to(this.dropdownBackground, 0.3, final)
    }

    animateDropdown() {
        const parallelAnimation = new TimelineMax()
        parallelAnimation.add([this.animateFooter.call(this), this.animateSize.call(this), this.slide.call(this)])
    }

    componentDidUpdate(prevProps, prevStates) {
        const contentBoxIsDifferent = this.props.dropdownBoxInfo.left !== prevProps.dropdownBoxInfo.left
        if (contentBoxIsDifferent) this.animateDropdown()
    }

    render() {
        return (
            <div className={this.props.className} ref={e => this.dropdownBackground = e}>
                <div className="footer-background" ref={e => this.footerBackground = e} />
            </div>
        )
    }

}

DropdownBackground.propTypes = {
    itemActive: PropTypes.string.isRequired,
    className: PropTypes.string,
    selectedItemPosition: PropTypes.object.isRequired
}


class Items extends Component {

    constructor() {
        super()
        this.items = {}
    }

    calculatePosition(item) {
        const {left, width, bottom} = clientRect(item)
            , xCenter = left + width / 2

        return { xCenter, bottom }
    }

    onMouseEnter(e, item) {
        const itemPosition = this.calculatePosition(e.target)
        this.props.onHover(item, itemPosition)
    }

    fixEventualScreenOverflow(dropdownElement) {
        const {width, left} = clientRect(dropdownElement)

        const leftOverflown = left < 0
            , rightOverflown = left + width > window.innerWidth

        let addition

        if (leftOverflown) addition = - left + 10
        else if (rightOverflown) addition = window.innerWidth - (left + width) - 30

        if (addition) TweenMax.set(dropdownElement, { x: `+=${addition}px` })
    }

    isThereDropdown() {
        const {main, footer} = menuItems[this.props.itemActive] || {}
        return !!(main || footer)
    }

    componentDidUpdate(prevProps, prevStates) {
        const {itemActive} = this.props
            , thereIsDropdown = this.thereIsDropdown()

        const showDropdown = thereIsDropdown && itemActive && itemActive !== prevProps.itemActive

        if (showDropdown) {
            const dropdown = this.items[itemActive].querySelector('.dropdown-content')
            this.fixEventualScreenOverflow(dropdown)

            const dropdownBoxInfo = clientRect(dropdown)
            dropdownBoxInfo.footerTop = clientRect(dropdown.querySelector(".footer")).top

            this.props.grabDropdownBoxInfo(dropdownBoxInfo)
        }
    }


    dropdownProps() {
        const props = {
            itemActive: this.props.itemActive,
            className: "dropdown-content",
        }

        return props
    }

    route(event, link){
        event.preventDefault()
        console.log(link)
    }

    render() {
        let items = [], {itemActive} = this.props

        for (let item in menuItems) {
            const {name: itemName, link} = menuItems[item]

            const liProps = {
                key: itemName,
                className: 'item',
                ref: e => this.items[item] = e,
                onMouseEnter: e => this.onMouseEnter.call(this, e, item)
            }

            const showDropdown = this.isThereDropdown() && item === itemActive

            let component = (
                <li {...liProps}>
                    <h4  {...itemNameProps} className="item-name" >{itemName}</h4>
                    <TransitionGroup component="div">
                        {showDropdown && <DropdownContent {...this.dropdownProps() } />}
                    </TransitionGroup>
                </li>
            )

            if (link) component = <a onClick={e => this.route(e, link)} >{component}</a>

            items.push(component)
        }

        return <ul className={this.props.className} onMouseLeave={this.props.onMouseLeave}>{items}</ul>
    }

}


Items.propTypes = {
    className: PropTypes.string,
    onHover: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired
}



class DropdownContent extends Component {

    componentWillEnter(callback) {
        TweenMax.set(this.dropdownContent, { className: "+=active", onComplete: callback })
    }

    componentWillLeave(callback) {
        TweenMax.set(this.dropdownContent, { className: "-=active", onComplete: callback })
    }

    render() {
        const {itemActive, className, onMouseLeave} = this.props

        const Footer = menuItems[itemActive].footer
            , Main = menuItems[itemActive].main

        return (
            <div className={className} ref={e => this.dropdownContent = e}>
                <div className="main">
                    <Main />
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        )


    }

}
