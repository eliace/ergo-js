import {Html, Text, Events, Domain, Config} from '../../src'
import {Layouts, Tabs, IconBox, Box, Button, Buttons, Notification} from '../../bulma'


function withEffect () {
    this.effect = () => {
        return new Promise((resolve) => {
            this.eff((el) => {resolve(el)})
          })
    }
    // return () => {
    //     delete this.effect
    // }
}

function withTransition () {
    this.transition = () => {
        return new Promise(resolve => {
            this.eff((el) => {
                const f = () => {
                    el.removeEventListener('transitionend', f)
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



function withShowHide (mixer) {
    mixer.merge({
        sources: {
            animation: {}
        },
//        dom: { withEffect, withTransition },
//        mix: { withEffect, withTransition },
        animationJoined: function (source) {

//            debugger
            withEffect.call(this)
            withTransition.call(this)

            const component = this

            const name = 'fade'            

            const { effect, transition } = this



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
        
            const show = source.createAction('show', async () => {
                const el = await effect()
                el.classList.add(name+'-enter-active', name+'-enter')
//                component.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
                await effect()
                el.classList.remove(name+'-enter')
//                component.opt('classes', {[name+'-enter']: false})
                await transition()
                el.classList.remove(name+'-enter-active')
//                component.opt('classes', {[name+'-enter-active']: false})
            }, this)
        
            const hide = source.createAction('hide', async () => {
                component.opt('classes', {[name+'-leave-active']: true, [name+'-leave']: true})
                await effect()
                component.opt('classes', {[name+'-leave-to']: true, [name+'-leave']: false})
                await transition()
                component.opt('classes', {[name+'-leave-to']: false, [name+'-leave-active']: false})
            }, this)
          
            source.watch(e => e.name == 'init', () => {
                return show()
              }, this)
            source.watch(e => e.name == 'destroy', () => {
                return hide()
              }, this)

        }
    })
} 






export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            sources: {
                data: {}
              },
              layout: Layouts.Content,
              $title: {
                html: 'h4',
                text: 'CSS transitions'
              },
              $content: {
                components: {
                  p: false
                },
                dataChanged: function (v, src) {
                  this.opt('components', src)
                },
                $button: {
                  as: Button,
                  text: 'Press me',
                  onClick: function (e, {data}) {
                    data.$toggle('p')
                  }
                },
                $p: {
                  html: 'p',
                  text: 'Hello!',
                  weight: 10,
                  mix: { withShowHide },
                //   join: {
                //     data: { ShowAndHide }
                //   },
                //   allJoined: function ({animation}) {
                //     animation.watch(e => e.name == 'init', () => {
                //       return animation.show()
                //     }, this)
                //     animation.watch(e => e.name == 'destroy', () => {
                //       return animation.hide()
                //     }, this)
                //   }
                }
            }
        }]
    }
}