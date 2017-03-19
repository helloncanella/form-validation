import React, { Component } from 'react'

export default class Column extends Component {

	render() {
		const className = [this.props.className, 'column-component'].join(' ')

		return (
			<div className={className}>

			</div>
		)

	}

}
