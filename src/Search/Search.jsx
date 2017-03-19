import React from 'react'
import './styles/style.scss'
import Column from './Column.jsx'
import createContainer from './create-container-mock.js'
import data from './fake-data/index.js'

class SearchComponent extends React.Component {
	render() {
		return (
			<div className='search-component row'>
				<div className="small-4 column">
					<Column />
				</div>
			</div>
		)
	}
}


export default createContainer(function () {
	return {
		boteco: 3
	}
}, SearchComponent)


