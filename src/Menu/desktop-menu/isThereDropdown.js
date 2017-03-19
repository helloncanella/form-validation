import menuItems from './menu-components/index.js'

export default function isThereDropdown(item) {
    const {main, footer} = menuItems[item] || {}
    return !!(main || footer)
}