import React, { Component, PropTypes } from 'react'
import { TweenMax } from "gsap"

class Marker extends Component {

    calculateTranslation() {
        const {selectedItemPosition} = this.props

        const x = selectedItemPosition.xCenter
            , y = selectedItemPosition.bottom

        return { x, y }
    }

    slide() {
        const {x, y} = this.calculateTranslation()
        TweenMax.to(this.marker, this.props.animationDuration, { x, y })
    }

    componentDidUpdate(prevProps, prevStates) {
        const {itemActive} = this.props
        if (itemActive && itemActive !== prevProps.itemActive) this.slide()
    }

    componentWillEnter(callback) {
        const {x, y} = this.calculateTranslation()

        let initial = { opacity: 0, position: 'fixed', top: 3, left: -6, width: 12, height: 12, x, y }
            , final = { opacity: 1, onComplete: callback }

        TweenMax.fromTo(this.marker, this.props.animationDuration, initial, final)
    }

    componentWillLeave(callback) {
        TweenMax.to(this.marker, this.props.animationDuration, { opacity: 0, onComplete: callback })
    }

    render() {
        return <div className='marker' ref={e => this.marker = e} />
    }

}

export default Marker

Marker.propTypes = {
    selectedItemPosition: PropTypes.object.isRequired,
    itemActive: PropTypes.string.isRequired,
    animationDuration: PropTypes.number.isRequired
}