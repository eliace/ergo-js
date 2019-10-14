
export const StopMouseDown = function (el) {
    const f = (evt) => evt.stopPropagation()
    el.addEventListener('mousedown', f)
    return () => {
      el.removeEventListener('mousedown', f)
    }
  }
  
export const El = function (el) {
    this.el = el
}


