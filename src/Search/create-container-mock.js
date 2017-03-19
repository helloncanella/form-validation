import React from 'react'

export default function createContainerMock(propsFunction, Component) {
	const props = propsFunction()
	return () => <Component {...props}></Component>
}