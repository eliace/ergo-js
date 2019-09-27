import { Domain, Layout, deepClone } from '../../src'

export default function withDropdown (mixer) {
    mixer.merge({
        sources: {
            model: function () {
                return new Domain({
                    left: 0,
                    top: 0,
                    scroll: 0
                })
            }
        },
        dom: { withUpdatePosition, withUpdateScroll },
        onUpdatePosition: function (e, {model}) {
            model.set('left', e.left)
            model.set('top', e.top)
        },
        onUpdateScroll: function (e, {model}) {
            model.set('scroll', e.scroll)
        },
        $dropdown: {
            styles: {
                position: 'absolute'
            },
            mixins: { withPortalSource },
    //      css: 'dropdown-menu',
            modelChanged: function (v, s, ids) {
                this.eff((el) => {
                    if (el) {
                        el.style.top = (v.top - v.scroll) + 'px'
                        el.style.left = v.left + 'px'    
                    }
                })
            }
        }
    })
  }
  


function withPortalSource (mixer) {
    mixer.merge({
        sources: {
            portal: (o, ctx) => ctx.portal
        },
        renderers: {
            '*': {
                update: function () {
                    this._dirty = true
                    this.sources.portal.emit('dirty')
                },
                render: () => {}
            },
            'portal': {
                render: function () {
                    const {html, props} = this._internal
                    const p = deepClone(props)
                    delete p.key
                    return Layout.simple(html, p, this.children || [])
                }
            }
        },
        portalJoined: function (s) {
            this.uuid = Math.random().toString(36).substr(2, 9)
            s.watch(e => e.name == 'init' && e.channel == 'portal', () => {
                s.$entry('components').$add(this)
            }, this)
            s.watch(e => e.name == 'destroy' && e.channel == 'portal', () => {
                // const comps = s.get('components')
                // const idx = comps.indexOf(this)
                s.$entry('components').find(this).$remove()//this)
            }, this)
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
  
  const withUpdatePosition = function (el) {
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
  
  //        this.sources.state.set('scroll', calcScroll(el).y)
  
        // el.style.top = parentBcr.bottom + 'px'
        // el.style.left = parentBcr.left + 'px'
  
        // const bcr = this.$content.el.getBoundingClientRect()
  
        // const {width, height} = windowDimensions()
  
        // if (parentBcr.bottom + bcr.height + 10 > height) {
        //     this.$content.el.style.height = (height - parentBcr.bottom - 10) + 'px'
        // }
    }
  }
  
  const withUpdateScroll = function (el) {
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
  