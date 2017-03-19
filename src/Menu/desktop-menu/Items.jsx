import React, { Component, PropTypes } from 'react'
import menuItems from './menu-components/index.js'
import TransitionGroup from 'react-addons-transition-group'
import { browserHistory } from 'react-router'
import { TweenMax } from "gsap"
import { clientRect } from '../helpers.js'
import isThereDropdown from './isThereDropdown.js'
import DropdownContent from './DropdownContent.jsx'


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
        this.xScreenOverflow = null
        
        const {width, left} = clientRect(dropdownElement)

        const leftOverflown = left < 0
            , rightOverflown = left + width > window.innerWidth

        let translation

        if (leftOverflown) translation = - left + 10
        else if (rightOverflown) translation = window.innerWidth - (left + width) - 30

        if (translation) {
            TweenMax.set(dropdownElement, { x: `+=${translation}px` })
            this.xScreenOverflow = translation
        }
        
    }

    componentDidUpdate(prevProps, prevStates) {
        const {itemActive} = this.props
            , thereIsDropdown = isThereDropdown(itemActive)

        const showDropdown = thereIsDropdown && itemActive && itemActive !== prevProps.itemActive

        if (showDropdown) {
            const dropdown = this.items[itemActive].querySelector('.dropdown-content')
            this.fixEventualScreenOverflow(dropdown)

            const dropdownBoxInfo = clientRect(dropdown)
            dropdownBoxInfo.footerTop = clientRect(dropdown.querySelector(".footer")).top

            if(this.xScreenOverflow) dropdownBoxInfo.xScreenOverflow = this.xScreenOverflow

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

    liProps(item) {
        const props = {
            key: item,
            className: 'item',
            ref: e => this.items[item] = e,
            onMouseEnter: e => this.onMouseEnter.call(this, e, item)
        }

        return props
    }

    itemNameProps(item) {
        return {
            onMouseEnter: e => this.onMouseEnter.call(this, e, item),
        }
    }

    route(event, link) {
        event.preventDefault()
        browserHistory.push(link)
    }

    render() { 
        let items = []

        for (let item in menuItems) {

            const {name, link} = menuItems[item]

            const showDropdown = isThereDropdown(item) && item === this.props.itemActive

            let component = (
                <li {...this.liProps(item) }>
                    <h4  {...this.itemNameProps(item) } className="item-name" >{name}</h4>
                    <TransitionGroup component="div">
                        {showDropdown && <DropdownContent {...this.dropdownProps() } />}
                    </TransitionGroup>
                </li>
            )

            if (link) component = <a onClick={e => this.route(e, link)} key={item} >{component}</a>

            items.push(component)
        }

        return <ul className={this.props.className} onMouseLeave={this.props.onMouseLeave}>{items}</ul>
    }

}


Items.propTypes = {
    className: PropTypes.string,
    onHover: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    grabDropdownBoxInfo: PropTypes.func.isRequired,
    itemActive: PropTypes.string,
}

export default Items



