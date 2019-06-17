import {Html, Layouts, Tabs, IconBox, Text, Button, Source, Buttons} from '../../src'

import {Mutate, Mixins} from '../helpers'

const Animation = {
  Mixins: {
    Transitions: function () {
      this.transition = function () {
        const target = this
        return new Promise(function (resolve, reject) {
//          console.log('listen transitionend', target.vnode.domNode)

          const callback = function (e) {
              console.log ('transitionend', target)
              target.off('transitionend', callback, 'dom')
              resolve()
          }

          target.on('transitionend', callback, 'dom')
        })
      }
      this.renderAfter = function (promise) {
        const projector = this.context.projector
        return promise
          .then(v => {
            projector.scheduleRender()
            return v
          })
          .catch(err => {
            projector.scheduleRender()
            return err
          })
      }
    }
  },
  Effectors: {
    Show: function (name, filter) {
      const eff = function () {
        return {
          resolver: () => {
            return this.renderAfter(this.transition())
          },
          ready: () => {
            this.opt('classes', {[name+'-enter']: false})
          },
          init: () => {
            this.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
          },
          done: () => {
            this.opt('classes', {[name+'-enter-active']: false})
          },
          activator: (activate) => {
            requestAnimationFrame(() => {
              activate()
              this.context.projector.scheduleRender()
            })
          }
        }
      }
      eff.watch = filter
//      eff.mode = 'pre'
      return eff
    },
    Hide: function (name, filter) {
      const eff = function () {
        return {
          resolver: () => this.renderAfter(this.transition()),
          ready: () => this.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true}),
        }
      }
      eff.watch = filter
      eff.mode = 'pre'
      return eff
    }
  }
}



export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: {p: false}
      },
      layout: Layouts.Content,
      $content: {
//        dynamic: true,
        dataChanged: Mutate.Components,
        $button: {
          type: Button,
          text: 'Press me',
          onClick: function () {
            // this.sources.data.toggle('p')
            // return
            const showEff = [{effector: 'show'}]
            const hideEff = [{effector: 'hide'}]

            const p = this.sources.data.get('p')
            if (p) {
              this.sources.data.when(hideEff).set('p', false)//.emit('set', {params: ['p', false]})
            }
            else {
              this.sources.data.set('p', true).then(showEff)//emit('set', {params: ['p', true]})
            }
          }
        },
        dynamic: {
          p: {
            html: 'p',
            text: 'Hello!',
            weight: 10,
            mixins: [Animation.Mixins.Transitions],
            dataEffectors: {
              hide: function () {
                return {
                  resolver: () => this.renderAfter(this.transition()),
                  ready: () => this.opt('classes', {'fade-enter-active': true, 'fade-enter': true}),
                }
              },
              show: function () {
                return {
                  resolver: () => {
                    return this.renderAfter(this.transition())
                  },
                  ready: () => {
                    this.opt('classes', {'fade-enter': false})
                  },
                  init: () => {
                    this.opt('classes', {'fade-enter-active': true, 'fade-enter': true})
                  },
                  done: () => {
                    this.opt('classes', {'fade-enter-active': false})
                  },
                  activator: (activate) => {
                    requestAnimationFrame(() => {
                      activate()
                      this.context.projector.scheduleRender()
                    })
                  }
                }
              }
            }
          }
        }
      }
    }, {
      sources: {
        data: new Source({show: true}, {
          logEvents: true,
          computed: {
            p: (v) => v.show
          }
        })
      },
      dataChanged: Mutate.Components,
      $button: {
        type: Button,
        text: 'Переключить отрисовку',
        onClick: function () {
          this.sources.data.toggle('show')
          // const showEff = [{effector: 'show'}]
          // const hideEff = [{effector: 'hide'}]
          //
          // const p = this.sources.data.get('show')
          // if (p) {
          //   this.sources.data.when(hideEff).set('show', false)//.emit('set', {params: ['p', false]})
          // }
          // else {
          //   this.sources.data.set('show', true).then(showEff)//emit('set', {params: ['p', true]})
          // }
        }
      },
      dynamic: {
        p: {
          html: 'p',
          text: 'Hello!',
          weight: 10,
          mixins: [Animation.Mixins.Transitions],
          dataEvents: function (evt) {
          //   if (evt.name == 'init' && evt.data.show) {
          //     this.sources.data.then([{effector: 'show'}])
          //   }
          },
          dataEffectors: {
            hide: Animation.Effectors.Hide('slide-fade', evt => evt.name == 'changed' && !evt.data.show),
            show: Animation.Effectors.Show('slide-fade', evt => (evt.name == 'init' || evt.name == 'changed') && evt.data.show)
          }
        }
      }
    }, {
      sources: {
        data: new Source({
          items: [1,2,3,4,5,6,7,8,9],
          nextNum: 10
        }, {
          methods: {
            randomIndex: function () {
              return Math.floor(Math.random() * this.entry('items').size())
            },
            add: function () {
              const v = this.get()
              this.entry('items').insert(this.randomIndex(), v.nextNum++)
            },
            remove: function () {
              this.entry('items').entry(this.randomIndex()).emit('remove')
            }
          }
        })
      },
      $buttons: {
        type: Buttons,
        items: [{
          text: 'Добавить',
          onClick: function () {
            this.sources.data.add()
          }
        }, {
          text: 'Удалить',
          onClick: function () {
            this.sources.data.remove()
          }
        }]
      },
      $list: {
        defaultItem: {
          as: 'list-item',
          dataChanged: Mutate.Text,
          mixins: [Animation.Mixins.Transitions],
          dataEffectors: {
            hide: Animation.Effectors.Hide('list', evt => evt.name == 'remove'),
            show: Animation.Effectors.Show('list', evt => evt.name == 'init')
          }
        },
        dataId: 'items',
        dataChanged: Mutate.Items
      }
    }]
  }
}
