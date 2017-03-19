import React, { Component, PropTypes } from 'react'
import { TweenMax, TimelineMax } from "gsap"
import {isSafari} from '../helpers.js'

class DropdownBackground extends Component {

    calculateTranslation() {
        const {dropdownBoxInfo} = this.props
            , {xScreenOverflow} = dropdownBoxInfo

        //initially, the initial positon was set to left:0 and top:0
        let translationX = dropdownBoxInfo.left - 0
            , translationY = dropdownBoxInfo.top - 0

        // SAFARI'S HACK - in safari the tranlationX MUST be updated MANUALLY when there is a screen overlflow           
        if(isSafari() && xScreenOverflow) translationX+=xScreenOverflow

        return { x: translationX, y: translationY }
    }

    calculateFooterTranslation() {
        const {footerTop} = this.props.dropdownBoxInfo
        const translationY = footerTop - this.footerInitialTop

        return translationY
    }

    slide() {
        const {x, y} = this.calculateTranslation()
        return TweenMax.to(this.dropdownBackground, this.props.animationDuration, { x, y })
    }

    animateSize() {
        const {height, width} = this.props.dropdownBoxInfo
        return TweenMax.to(this.dropdownBackground, this.props.animationDuration, { height, width })
    }

    animateFooter() {
        const footerTranslation = this.calculateFooterTranslation()
        return TweenMax.to(this.footerBackground, this.props.animationDuration, { y: footerTranslation })
    }

    adjustFooterPosition() {
        this.footerInitialTop = this.props.dropdownBoxInfo.top
        const footerTranslation = this.calculateFooterTranslation()
        TweenMax.set(this.footerBackground, { y: footerTranslation })
    }

    componentWillEnter(callback) {
        const {width, height, footerTop} = this.props.dropdownBoxInfo
            , {x, y} = this.calculateTranslation() 
        
        const initial = {
            position: 'absolute', top: 0, left: 0,
            x, y,
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

        TweenMax.fromTo(this.dropdownBackground, this.props.animationDuration, initial, final)

        this.adjustFooterPosition()
    }

    componentWillLeave(callback) {
        let final = { rotationX: -15, opacity: 0 }

        final.onComplete = callback

        TweenMax.to(this.dropdownBackground, this.props.animationDuration, final)
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
    selectedItemPosition: PropTypes.object.isRequired,
    dropdownBoxInfo: PropTypes.object.isRequired,
    animationDuration: PropTypes.number.isRequired
}

export default DropdownBackground