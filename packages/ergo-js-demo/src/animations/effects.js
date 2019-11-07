import { Effect } from "chorda-core"

export function domEffect (source) {
    source.effect = () => {
        return new Promise((resolve) => {
            this.eff((el) => {resolve(el)})
          })
    }
    // return () => {
    //     delete this.effect
    // }
}

function domTransition (source) {
    source.transition = () => {
        return new Promise(resolve => {
            this.eff((el) => {
                const f = () => {
                    el.removeEventListener('transitionend', f)
                    console.log('transitionend')
                    resolve(el)
                }
                el.addEventListener('transitionend', f)
            })
        })
    }
    // return () => {
    //     delete this.transition
    // }
}



class CancelError extends Error {
    constructor (msg) {
      super(msg)
      this.name = 'CancelError'
    }
}
    

export class ShowHideEffect extends Effect {
    constructor (name, promise, options, owner) {
        super(name, promise, {group: 'ShowHide', ...options}, owner)
    }
    resolveCollisions (collisions) {
        collisions.forEach(eff => {
            eff.finalize('cancel', new CancelError())
        })
    }
}


function domShowAndHide (dom, ch) {

    // withEffect.call(this)
    // withTransition.call(this)

//    const name = 'fade'            

//    const { dom } = this



    // const effects = () => {
    //     return new Promise((resolve) => {
    //       component.eff((el) => {resolve(el)})
    //     })
    //   }
  
    // const transition = () => {
    //     return new Promise(resolve => {
    //         component.eff((el) => {
    //             const f = () => {
    //                 el.removeEventListener('transitionend', f)
    //                 resolve()
    //             }
    //             el.addEventListener('transitionend', f)
    //         })
    //     })
    // }
    const { options } = this

    const show = dom.createAction('show', async () => {
        const name = options.show || 'fade'
        const el = await dom.effect()
        if (el) {
            el.classList.add(name+'-enter-active', name+'-enter')
            await dom.effect()
            el.classList.remove(name+'-enter')
            await dom.transition()
            el.classList.remove(name+'-enter-active')    
        }
    }, this, {effect: ShowHideEffect})

    const hide = dom.createAction('hide', async () => {
        const name = options.hide || 'fade'
        const el = await dom.effect()
        if (el) {
            el.classList.add(name+'-leave-active', name+'-leave')
            await dom.effect()
            el.classList.add(name+'-leave-to')
            el.classList.remove(name+'-leave')
            await dom.transition()
            el.classList.remove(name+'-leave-to', name+'-leave-active')    
        }
    }, this, {effect: ShowHideEffect})

    dom.$watch(e => e.name == 'show' && e.channel == 'cancel', () => {
        const name = options.show || 'fade'
        this.eff(el => {
            el.classList.remove(name+'-enter-active', name+'-enter')
        })
    }, this)

    dom.$watch(e => e.name == 'hide' && e.channel == 'cancel', () => {
        console.log('cancel hide')
        const name = options.hide || 'fade'
        this.eff(el => {
            el.classList.remove(name+'-leave-active', name+'-leave', name+'-leave-to')
        })
    }, this)

    // dom.watch(e => true, (e) => {
    //     console.log(e)
    // }, this)

    dom.$watch(e => e.name == 'init' && e.channel == ch, () => {
        return show()
      }, this)
    dom.$watch(e => e.name == 'destroy' && e.channel == ch, () => {
        return hide()
      }, this)

}





export function withShowHide (mixer) {
    mixer.merge({
        sources: {
            animation: {}
        },
        join: {
            animation: { domShowAndHide, domEffect, domTransition }
        }
    })
}



class FLIPEffect extends Effect {
    constructor (name, promise, options, owner) {
        super(name, promise, {group: 'FLIP', ...options}, owner)
    }
    resolveCollisions (collisions) {
        collisions.forEach(eff => {
            eff.finalize('cancel')
        })
    }
}



function domFLIP (dom) {

    dom.$watch(e => e.name == 'flip' && e.channel == 'cancel', () => {
//        this.el.style.transition = 'none'
        const name = 'flip-list'
        this.el.classList.remove(name+'-move')  
    })

    dom.createAction('flip', async () => {

        const {el} = this
        const name = 'flip-list'

        if (el) {
            el.style.transition = 'none'

            const bcr = el.getBoundingClientRect()

            await dom.effect()

            const bcr2 = el.getBoundingClientRect()

            const dx = bcr.left - bcr2.left
            const dy = bcr.top - bcr2.top

//            console.log(dx, dy, this.props.key)

            el.style.transform = 'translate('+dx+'px, '+dy+'px)'

            await dom.effect()

            el.classList.add(name+'-move')
            el.style.transform = null
            el.style.transition = null

            await dom.transition()

            el.classList.remove(name+'-move')  
//            el.style.transition = 'none'
        }
    }, this, {effect: FLIPEffect})

}




function getEl (el) {
    this.el = el
}


export function delay (timeout) {
    console.log('t', timeout)
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), timeout)
    })
}



export function withFLIP (mixer) {
    mixer.merge({
        sources: {
            animation: {}
        },
        join: {
            animation: { domFLIP, domEffect, domTransition }
        },
        dom: { getEl }
    })
}




