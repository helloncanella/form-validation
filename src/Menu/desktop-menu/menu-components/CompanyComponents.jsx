import React, { Component } from 'react'
import Icon from '../../reusable-components/IconMock.jsx'
import Badge from '../../reusable-components/Badge.jsx'

export class CompanyMainComponent extends Component {

	items() {
		const items = ['About Stripe', 'Customers', 'Jobs']
		
		const components = items.map((item, index)=>{
			return (
				<li className="linkTitle link" key={index}>
					<Icon />
					<span>{item}</span>
				</li>
			)
		})		

		return <ul>{components}</ul>
	}

	render() {
		return (
			<div className='company-main-component'>
				{this.items()}
			</div>
		)

	}

}

export class CompanyBottomComponent extends Component {

	articleList(){
		const articles = [
			{name: 'Lorem ipsum dolor sit amet', badge: 'new'},
			{name: 'Lorem ipsum dolor sit amet', badge: 'new'},
			{name: 'Lorem ipsum dolor sit amet'},
		]

		const articlesList = articles.map(({name, badge}, index)=>{
			return (
				<li className="hoverable" key={index}>{name}</li>
			)
		})


		return <ul className="article-list">{articlesList}</ul>
	}

	render() {
		return (
			<div className='company-bottom-component'>
				<h3 className="linkTitle">
					<Icon />
					<span>From the blog</span>
				</h3>
				{this.articleList()}
			</div>
		)

	}

}