import { Domain, Layout, deepClone } from 'chorda-core'
import { stopMouseDown, isVisible } from '../dom'
import withPortalSource from './withPortalSource'

export default function withDropdown (mixer) {
    mixer.mix({
        sources: {
            dimensions: function () {
                return {
                    left: 0,
                    top: 0,
                    scroll: 0
                }
            }
        },
        dom: { onUpdatePosition, onUpdateScroll, stopMouseDown },
        onUpdatePosition: function (e, {dimensions}) {
            dimensions.set('left', e.left)
            dimensions.set('top', e.top)
        },
        onUpdateScroll: function (e, {dimensions}) {
            dimensions.set('scroll', e.scroll)
        },
        components: {
            dropdown: false
        },
        $dropdown: {
            styles: {
                position: 'absolute'
            },
            mix: { withPortalSource },
            dom: { stopMouseDown },
            dimensionsChanged: function (v) {
//                if (!this._internal.el || this._internal.el.offsetParent != null) {
                    this.eff((el) => {
                        if (el) {
                            el.style.top = (v.top - v.scroll) + 'px'
                            el.style.left = v.left + 'px'    
                        }
                    })    
//                }
            }
        }
    })
}
  


  
const calcScrollY = function (el) {
    let parent = el.parentElement
    let scrollY = window.scrollY
    while (parent) {
        scrollY += parent.scrollTop
        parent = parent.parentElement
    }
    return scrollY
}
  
const windowDimensions = function () {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
    }
}
  
  const onUpdatePosition = function (el) {
    if (el) {
        const parentBcr = el.getBoundingClientRect()
  
        const evt = {
          top: parentBcr.bottom + calcScrollY(el),
          left: parentBcr.left
        }
        this.notify('onUpdatePosition', evt)
        // this.sources.state.set('top', parentBcr.bottom + calcScrollY(el))
        // this.sources.state.set('left', parentBcr.left)
  
        // if (this._internal.options.onUpdatePosition) {
        //   this._internal.options.onUpdatePosition.call(this, evt, this.sources)
        // }
  
        // el.style.top = parentBcr.bottom + 'px'
        // el.style.left = parentBcr.left + 'px'
  
        // const bcr = this.$content.el.getBoundingClientRect()
  
        // const {width, height} = windowDimensions()
  
        // if (parentBcr.bottom + bcr.height + 10 > height) {
        //     this.$content.el.style.height = (height - parentBcr.bottom - 10) + 'px'
        // }
    }
  }
  
  const onUpdateScroll = function (el) {
    const f = () => {
      this.notify('onUpdateScroll', {scroll: calcScrollY(el)})
        // let scrollTotal = 0
        // path.forEach(element => scrollTotal += element.scrollTop)
        // this.sources.state.set('scroll', scrollTotal)
  //      this.sources.state.set('scroll', calcScrollY(el))
    }
    const path = []
    let element = el//this.parent.el
    while (element) {
        path.push(element)
        element = element.parentElement
    }
    path.forEach(element => element.addEventListener('scroll', f))
    f()
    return () => {
        path.forEach(element => element.removeEventListener('scroll', f))
    }
  }
  

