import React, { Component } from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { TweenMax } from 'gsap'
import {triggerWhenResizeEnds} from '../helpers.js'
import Content from './ContentMock.jsx'

class MobileMenu extends Component {

	constructor() {
		super()
		this.state = {
			opened: false
		}
	}


	hamburgerButton() {
		return <div className="hamburger" onClick={this.open.bind(this)} />
	}

	open() {
		this.setState({ opened: true })
	}


	close() {
		this.setState({ opened: false })
	}

	render() {
		const Hamburger = this.hamburgerButton.bind(this)

		return (
			<div className='mobile-menu'>
				<Hamburger />
				<TransitionGroup >
					{this.state.opened && <Popup onClose={this.close.bind(this)} />}
				</TransitionGroup>
			</div>
		)

	}

}

export default MobileMenu


class Popup extends Component {

	constructor() {
		super()

		this.animationState = {
			initial: {
				rotationX: -15,
				rotationY: -15,
				transformOrigin: '100% 0',
				opacity: 0,
			},
			final: {
				rotationX: 0,
				rotationY: 0,
				opacity: 1
			}
		}
	}

	componentWillEnter(callback) {
		let {initial, final} = this.animationState
		
		final.onComplete = callback

		TweenMax.fromTo(this.popup, 0.25, initial, final)
	}

	componentWillLeave(callback) {
		let {initial} = this.animationState

		initial.onComplete = callback

		TweenMax.to(this.popup, 0.25, initial)
	}

	closeButton() {
		return <div className="close-button" onClick={this.props.onClose} />
	}

	render() {
		const CloseButton = this.closeButton.bind(this)

		return (
			<div className="popup" ref={e => this.popup = e}>
				<CloseButton />
				<Content />
			</div>
		)
	}

}