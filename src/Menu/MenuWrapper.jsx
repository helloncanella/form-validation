import React, { Component } from 'react'
import { verifyIfIsMobile as isMobile, triggerWhenResizeEnds } from './helpers.js'
import DesktopMenu from './desktop-menu/DesktopMenu.jsx'
import MobileMenu from './mobile-menu/MobileMenu.jsx'

import './styles/index.scss'

class MenuWrapper extends Component {

	constructor() {
		super()
		this.breakingPoint = 670
		this.state = {
			isMobile: isMobile(this.breakingPoint)
		}
		this.verifyIfIsMobile = this.verifyIfIsMobile.bind(this)
	}


	componentDidMount() {
		triggerWhenResizeEnds(this.verifyIfIsMobile)
	}

	verifyIfIsMobile() {
		this.setState({ isMobile: isMobile(this.breakingPoint) })
	}

	render() {
		const mobileMenu = <MobileMenu />
			, desktopMenu = <DesktopMenu  />

		return (
			<div className='menu-wrapper'>
				{this.state.isMobile ? mobileMenu : desktopMenu}
			</div>
		)
	}

}


export default MenuWrapper
