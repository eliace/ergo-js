import {Domain, Effect} from 'chorda-core'
import {Layouts, Button, Buttons} from 'chorda-bulma'

import _ from 'lodash'
import Velocity from 'velocity-animate/velocity'

import {withShowHide, withFLIP, delay, domEffect} from './effects'



function withVelocity (mixer) {
    mixer.merge({
        sources: {
            animation: {}
        },
        join: {
            animation: { 
                domEffect, 
                custom: function (dom) {

                    const velocityHide = function (el) {
                        return new Promise((resolve) => {
                          Velocity(
                            el,
                            { opacity: 0, height: 0 },
                            { complete: () => resolve(), duration: 1000 }
                          )
                        })
                      }
        
                    const velocityShow = function (el) {
                        return new Promise((resolve) => {
                          Velocity(
                            el,
                            { opacity: 1, height: '1.6em' },
                            { complete: () => resolve(), duration: 1000 }
                          )
                        })
                    }
        
                    dom.createAction('show', async () => {
                        const el = await dom.effect()
                        if (el) {
                            if (dom.subscribers.filter(s => s instanceof Effect && s.name == 'hide').length == 0) {
                                el.style.opacity = 0
                                el.style.height = 0
                            }
                            const t = this.index * 150
                            await delay(t)
    //                        console.log(this.index * 150)
    //                        const el = await dom.effect()
                            await velocityShow(el)                                
                        }
                    }, this)

                    dom.createAction('hide', async () => {
                        const t = this.index * 150
                        await delay(t)
                        const el = await dom.effect()
                        if (el) {
                            await velocityHide(el)
                        }
                        console.log('hidden')
                    }, this)


                }
            }
        }
    })
}


export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            sources: {
                view: {}
            },
            components: {
                p: false
            },
            viewChanged: function (v, src) {
                this.opt('components', src)
            },
            $button: {
                as: Button,
                text: 'Press me',
                onClick: function (e, {view}) {
                    view.$toggle('p')
                }
            },
            $p: {
                html: 'p',
                text: 'Hello!',
                weight: 10,
                mix: { withShowHide }
            }
        }, {
            sources: {
                view: {}
            },
            components: {
                p: false
            },
            viewChanged: function (v, src) {
                this.opt('components', src)
            },
            $button: {
                as: Button,
                text: 'Переключить отрисовку',
                onClick: function (e, {view}) {
                    view.$toggle('p')
                }
            },
            $p: {
                html: 'p',
                text: 'Hello!',
                weight: 10,
                show: 'slide-fade',
                hide: 'slide-fade',
                mix: { withShowHide }
            }
        }, {
            sources: {
                data: new Domain({
                    items: [1,2,3,4,5,6,7,8,9],
                    nextNum: 10
                }, {
                  actions: {
                    randomIndex: function () {
                      return Math.floor(Math.random() * this.$entry('items').$size())
                    },
                    add: function () {
                      const v = this.get()
                      const items = [...v.items]
                      items.splice(this.randomIndex(), 0, v.nextNum++)
                      this.set('items', items)//this.get('items').splice(this.randomIndex(), 0, v.nextNum++))
//                      this.$entry('items').$insert(this.randomIndex(), v.nextNum++)
                    },
                    remove: function () {
//                      this.$entry('items').$remove(this.randomIndex())
                        const v = this.get()
                        const items = [...v.items]
                        items.splice(this.randomIndex(), 1)
                        this.set('items', items)//this.get('items').splice(this.randomIndex(), 0, v.nextNum++))
                    }
                  }
                })
              },
              $buttons: {
                as: Buttons,
                items: [{
                  text: 'Добавить',
                  onClick: function (e, {data}) {
                    data.add()
                  }
                }, {
                  text: 'Удалить',
                  onClick: function (e, {data}) {
                    data.remove()
                  }
                }]
              },
              $list: {
                defaultItem: {
                  css: 'list-item',
                  dataChanged: function (v) {
                      this.opt('text', v)
                  },
                  mix: { withShowHide }
                },
                dataId: 'items',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            }
        
        }, {
            sources: {
                data: new Domain(null, {
                  initial: {
                    items: [1,2,3,4,5,6,7,8,9]
                  },
                  actions: {
                    shuffle: function () {
                      return this.set('items', _.shuffle(this.get('items')))
                    }
                  }
                }),
                view: {}
            },
            // allBound: function ({view}) {
            //     view.createEvent('shuffleBtn', this)
            // },
            onShuffleBtn: function (e, {data}) {
                data.shuffle()
            },
            $buttons: {
                as: Buttons,
                items: [{
                  text: 'Перемешать',
                  onClick: function (e, {data}) {
                    data.shuffle()
                  }
                }]
            },
            $list: {
                defaultItem: {
                    dataChanged: function (v) {
                        this.opt('text', v)
                    },
                    allJoined: function ({data, animation}) {
                        data.watch(e => e.name == 'changed', () => {
                            animation.flip()
                        }, this)
                    },
                    mix: { withFLIP }
                },
                dataId: 'items',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            }
        }, {
            sources: {
                data: new Domain({
                  items: [1,2,3,4,5,6,7,8,9],
                  nextNum: 10
                }, {
                    actions: {
                        randomIndex: function () {
                          return Math.floor(Math.random() * this.$entry('items').$size())
                        },
                        add: function () {
                          const v = this.get()
                          const items = [...v.items]
                          items.splice(this.randomIndex(), 0, v.nextNum++)
                          this.set('items', items)//this.get('items').splice(this.randomIndex(), 0, v.nextNum++))
    //                      this.$entry('items').$insert(this.randomIndex(), v.nextNum++)
                        },
                        remove: function () {
    //                      this.$entry('items').$remove(this.randomIndex())
                            const v = this.get()
                            const items = [...v.items]
                            items.splice(this.randomIndex(), 1)
                            this.set('items', items)//this.get('items').splice(this.randomIndex(), 0, v.nextNum++))
                        }
                      }
                    })
              },
              $buttons: {
                as: Buttons,
                items: [{
                  text: 'Добавить',
                  onClick: function (e, {data}) {
                    data.add()
                  }
                }, {
                  text: 'Удалить',
                  onClick: function (e, {data}) {
                    data.remove()
                  }
                }]
              },
              $list: {
                styles: {
                  'position': 'relative'
                },
                defaultItem: {
                  css: 'list-complete-item',
                  dataChanged: function (v) {
                    this.opt('text', v)
                  },
                  show: 'list-complete',
                  hide: 'list-complete',
                  mix: { withShowHide, withFLIP },
                  allJoined: function ({data, animation}) {
                    data.watch(e => e.name == 'changed', () => {
                        animation.flip()
                    }, this)
                  }
                },
                dataId: 'items',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                }
            }
        }, {
            sources: {
                data: new Domain({
                  query: '',
                  list: [
                    { msg: 'Брюс Ли' },
                    { msg: 'Джеки Чан' },
                    { msg: 'Чак Норрис' },
                    { msg: 'Джет Ли' },
                    { msg: 'Кунг Фьюри' }
                  ]
                }, {
                  properties: {
                    filteredList: {
                      calc: function (v) {
                        return v.list.filter((item) => {
                          return item.msg.toLowerCase().indexOf(v.query.toLowerCase()) !== -1
                        })
                      },
                      key: v => v && v.msg
                    }
                  }
                })
            },
            $input: {
                html: 'input',
                dataId: 'query',
                dataChanged: function (v) {
                    this.opt('value', v)
                },
                onChange: function (e, {data}) {
                  data.set(e.target.value)
                }
            },
            $list: {
                html: 'ul',
                dataId: 'filteredList',
                dataChanged: function (v, s, k) {
                    this.opt('items', s.$iterator(k))
                },
                height: 150,
                defaultItem: {
                  sources: {
                    view: {}
                  },
                  html: 'li',
                  dataChanged: function (v) {
                    this.opt('text', v && v.msg)
                  },
                  mix: { withVelocity },
                  allJoined: function ({data, animation}) {
                    data.watch(e => e.name == 'init', () => {
                        return animation.show()
                    }, this)
                    data.watch(e => e.name == 'destroy', () => {
                        return animation.hide()
                    }, this)
                  }
                }
            }                
        }]
    }
}