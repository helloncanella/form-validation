import React, { Component } from 'react'
import Icon from '../../reusable-components/IconMock.jsx'

export class DevelopersMainComponent extends Component {

	top() {
		return (
			<div className="top hoverable">
				<h3 className="title">
					<Icon size={17} color="#6772e5" />
					<span>Documentation</span>
				</h3>
				<p>Lorem ipsum dolor sit amet, consectetur.</p>
			</div>
		)
	}

	bottom() {
		const lists = {
			"get started":[
				'Elements', 'Checkout', 'Mobile apps', 'Libraries'
			],
			"popular topics":[
				'Apple Pay', 'Testing', 'Launching checklist', 'Plug-ins'
			]
		}

		let components = []

		for(let title in lists){
			const itens = lists[title].map((item, index)=><li key={index}>{item}</li>)

			let list = (
				<ul className="list" key={title}>
					<li className="linkTitle">{title}</li>
					{itens}
				</ul>
			)

			components.push(list)
		}


		return (
			<div className="bottom">
				{components}
			</div>
		)
	}

	render() {
		return (
			<div className='developer-main-component'>
				{this.top()}
				{this.bottom()}
			</div>
		)

	}

}

export class DevelopersBottomComponent extends Component {

	items(){

		const items = ['Full api reference', 'Api status', 'open source']
			, icon = <Icon size={17} color="#6772e5" />
			
		return items.map((item, index)=>{
			item = <h3 className="linkTitle">{item}</h3>
		
			return (
				<li key={index} className="link">
					{icon}
					{item}
				</li>
			)
		})

	}

	render() {
		return (
			<ul className='developer-bottom-component'>
				{this.items()}
			</ul>
		)

	}

}