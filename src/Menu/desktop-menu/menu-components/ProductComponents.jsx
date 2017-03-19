import React, { Component } from 'react'
import Icon from '../../reusable-components/IconMock.jsx'


export class ProductMainComponent extends Component {

	text(item, text, color) {
		const style = { textTransform: 'uppercase', color }

		return (
			<div className="text">
				<h3 className="title" style={style}>{item}</h3>
				<p className="linkSub">{text}</p>
			</div>
		)
	}

	items() {
		const items = [
			{ item: 'Payments', color: '#6772e5', text: 'A complete commerce toolkit, built for developers.' },
			{ item: 'Subscriptions', color: '#24b47e', text: "The smart engine for recurring payments." },
			{ item: 'Connect', color: '#3297d3', text: 'Everything platforms need to get sellers paid' },
			{ item: 'Relay', color: '#e25950', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit." },
			{ item: 'Atlas', color: '#e39f48', text: "Lorem ipsum dolor sit amet, consectetur." },
			{ item: 'Radar', color: '#b76ac4', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit." },
		]

		const components = items.map(({item, color, text}, index) => {
			const icon = <Icon size={48} color={color} />
			
			text = this.text(item, text, color)

			return (
				<li className="item" key={index}>
					{icon}
					{text}
				</li>
			)
		})

		return <ul>{components}</ul>

	}

	render() {
		return (
			<div className='product-main-component'>
				{this.items()}
			</div>
		)

	}

}

export class ProductBottomComponent extends Component {

	render() {

		const icon = <Icon size={26} color="#6772e5" />

		return (
			<ul className='product-bottom-component'>
				<li className="link">
					{icon}
					<span>Pricing</span>
				</li>
				<li className="link">
					{icon}
					<span>Work With Stripe</span>
				</li>

			</ul>
		)

	}

}