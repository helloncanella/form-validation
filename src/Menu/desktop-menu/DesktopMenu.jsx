import React, { Component, PropTypes } from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { TweenMax, TimelineMax } from "gsap"
import { clientRect, isMouseOn, triggerWhenResizeEnds} from '../helpers.js'
import isThereDropdown from './isThereDropdown.js'
import Marker from './Marker.jsx'
import DropdownBackground from './DropdownBackground.jsx'
import Items from './Items.jsx'
import menuItems from './menu-components/index.js'

class DesktopMenu extends Component {
    constructor() {
        super()
        this.state = {
            itemActive: '',
            selectedItemPosition: {},
            dropdownBoxInfo: null,
        }
        this.animationDuration = 0.3 //seconds
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
            animationDuration: this.animationDuration
        }
    }

    markerProps() {
        const {itemActive, selectedItemPosition} = this.state

        return {
            itemActive,
            selectedItemPosition,
            animationDuration: this.animationDuration
        }
    }

    render() {
        const {itemActive, dropdownBoxInfo} = this.state

        const thereIsDropdown = isThereDropdown(itemActive)
            , dropdownContentIsActive = !!(thereIsDropdown && itemActive && dropdownBoxInfo)

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



