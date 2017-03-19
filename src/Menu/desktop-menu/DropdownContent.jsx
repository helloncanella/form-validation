import React, { Component, PropTypes } from 'react'
import { TweenMax } from "gsap"
import menuItems from './menu-components/index.js'

class DropdownContent extends Component {

    componentWillEnter(callback) {
        TweenMax.set(this.dropdownContent, { className: "+=active", onComplete: callback })
    }

    componentWillLeave(callback) {
        TweenMax.set(this.dropdownContent, { className: "-=active", onComplete: callback })
    }

    render() {
        const {itemActive, className} = this.props

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

export default DropdownContent

DropdownContent.propTypes = {
    itemActive: PropTypes.string.isRequired,
    className: PropTypes.string,
}
