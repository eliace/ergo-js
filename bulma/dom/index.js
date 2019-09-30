


export function stopMouseDown (el) {
    const f = evt => evt.stopPropagation()
    el.addEventListener('mousedown', f)
    return () => {
        el.removeEventListener('mousedown', f)
    }
}

export function getEl (el) {
    this.el = el
}

export function isVisible (el) {
    this.isVisible = () => el.offsetParent != null
    return () => {
        delete this.isVisible
    }
}


