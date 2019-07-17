import {Html, Layouts, Domain, Text} from '../../src'

import {Mutate, Mixins} from '../helpers'

import TweenLite from "gsap/TweenLite"
import TWEEN from '@tweenjs/tween.js'


function valueToPoint (value, index, total) {
  var x     = 0
  var y     = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  var tx    = x * cos - y * sin + 100
  var ty    = x * sin + y * cos + 100
  return { x: tx, y: ty }
}

function generatePoints (stats) {
	var total = stats.length
	return stats.map(function (stat, index) {
    var point = valueToPoint(stat, index, total)
    return point.x + ',' + point.y
  }).join(' ')
}


class AnimatedNumber extends Html {
  static defaultOpts = {
    html: 'span',
    sources: {
      vm: function () {
        return {
          tweeningValue: 0
        }
      }
    },
    vmChanged: function (v) {
      this.opt('text', v.tweeningValue)
    },
    vmEffectors: {
      tween: (function () {
        const eff = function () {
          return {
            init: (value, event) => {
              return {start: event.cache['value'] || 0, end: value['value']}
            },
            resolver: (values) => {
              const vm = this.sources.vm

              function animate () {
                if (TWEEN.update()) {
                  requestAnimationFrame(animate)
                }
                else {
                  console.log('stop')
                }
              }

              console.log('tween', values.start, values.end)

              new TWEEN.Tween({ tweeningValue: values.start })
                .to({ tweeningValue: values.end }, 500)
                .onUpdate(function (obj) {
                  vm.set('tweeningValue', obj.tweeningValue.toFixed(0))
                })
                .start()

                animate()
            }
          }
        }
        eff.watch = (evt) => evt.name == 'changed' && evt.ids && ('value' in evt.ids)
        return eff
      })()
    }
  }
  static OPTIONS = {
    value: {
      initOrSet: function (v) {
        this.sources.vm.set('value', v)
      }
    }
  }
}



export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: new Domain({
          number: 0,
          tweenedNumber: 0
        }, {
          computed: {
            animatedNumber: function (v) {
              return v.tweenedNumber.toFixed(0)
            }
          },
          effectors: {
            tween: (function () {
              const eff = function () {
                return {
                  resolver: (val) => {
                    // TweenLite.to(val, 0.5, {
                    //   tweenedNumber: val.number,
                    //   onUpdate: () => this.update('none')})
                      TweenLite.to(this.proxy(), 0.5, {tweenedNumber: val.number})
                  }
                }
              }
              eff.watch = (evt) => evt.name == 'changed' && evt.ids && evt.ids['number']
              return eff
            })()
          }
        })
      },
      $input: {
        html: 'input',
        _type: 'number',
        step: 20,
        dataId: 'number',
        dataChanged: Mutate.Value,
        onInput: function (e, {data}) {
          data.set(e.target.value)
        }
      },
      $p: {
        html: 'p',
        dataId: 'animatedNumber',
        dataChanged: Mutate.Text
      }
    }, {
      sources: {
        data: function () {
          var defaultSides = 10
        	var stats = Array.apply(null, { length: defaultSides })
          	.map(function () { return 100 })
          return new Domain({
            stats: stats,
          	points: generatePoints(stats),
            sides: defaultSides,
            minRadius: 50,
            interval: null,
            updateInterval: 1000
          }, {
            methods: {
              updateSides: function (newSides, oldSides) {
                var sidesDifference = newSides - oldSides
                if (sidesDifference > 0) {
                	for (var i = 1; i <= sidesDifference; i++) {
                  	this.entry('stats').add(this.newRandomValue())
                  }
                } else {
                  var absoluteSidesDifference = Math.abs(sidesDifference)
                	for (var i = 1; i <= absoluteSidesDifference; i++) {
                    this.entry('stats').remove(0)
                  }
                }
              },
              updateStats: function (newStats) {
          			TweenLite.to(
                	this.$,
                  this.get('updateInterval') / 1000,
                  { points: generatePoints(newStats) }
              	)
              },
              newRandomValue: function () {
               	return Math.ceil(this.get('minRadius') + Math.random() * (100 - this.get('minRadius')))
              },
              randomizeStats: function () {
              	var vm = this
                this.set('stats', this.get('stats').map(function () {
                	return vm.newRandomValue()
                }))
              },
              resetInterval: function () {
              	var vm = this
              	clearInterval(this.interval)
                this.randomizeStats()
              	this.interval = setInterval(function () {
                	vm.randomizeStats()
                }, this.get('updateInterval'))
              }
            },
            changed: function (evt) {
              if (evt.ids) {
                if ('sides' in evt.ids) {
                  this.updateSides(evt.data['sides'], evt.cache['sides'])
                }
                if ('stats' in evt.ids) {
                  this.updateStats(evt.data['stats'], evt.cache['stats'])
                }
              }
            },
            // watchers: {
            //   reset: {
            //     when: (e) => {console.log('when', e); return e.name == 'init'},
            //     init: function () {
            //       debugger
            //       this.resetInterval()
            //     }
            //   }
            //   // init: function (evt) {
            //   //   debugger
            //   //   this.resetInterval()
            //   // }
            // }
          })
        }
      },
      effects: {
        data: [(data, target) => {
          data.watch(e => e.name == 'init', target, () => {
            data.resetInterval()
          })
          data.watch(e => e.name == 'destroy', target, () => {
            debugger
            clearInterval(data.interval)
          })
        }]
      },
//      dataChanged: () => {},
      // dataEvents: function (evt) {
      //   if (evt.name == 'init') {
      //     this.sources.data.resetInterval()
      //   }
      // },
      as: 'svg-polygon-example',
      width: 400,
      $svg: {
        html: 'svg',
        width: 200,
        height: 200,
        $polygon: {
          html: 'polygon',
          dataId: 'points',
          dataChanged: function (v) {
            this.opt('points', v)
          }
        },
        $circle: {
          html: 'circle',
          cx: 100,
          cy: 100,
          r: 90
        }
      },
      defaultItem: {
        layout: Layouts.PassThrough,
        components: {
          label: {
            html: 'label',
            dataChanged: Mutate.Text
          },
          input: {
            html: 'input',
            _type: 'range',
            dataChanged: Mutate.Value,
            onInput: function (e, {data}) {
              data.set(Number(e.target.value))
            }
          }
        }
      },
      items: [{
        $label: {
          dataId: 'sides',
          format: (v) => 'Sides: ' + v
        },
        $input: {
          min: 3,
          max: 500,
          dataId: 'sides'
        }
      }, {
        $label: {
          dataId: 'minRadius',
          format: (v) => 'Minimum Radius: '+v+'%'
        },
        $input: {
          min: 0,
          max: 90,
          dataId: 'minRadius'
        }
      }, {
        $label: {
          dataId: 'updateInterval',
          format: (v) => 'Update Interval: '+v+' milliseconds'
        },
        $input: {
          min: 10,
          max: 2000,
          dataId: 'updateInterval'
        }
      }]
    }, {
      sources: {
        data: new Domain(null, {
          initial: function () {
            return {
              firstNumber: 20,
              secondNumber: 40
            }
          },
          properties: {
            result: {
              calc: function (v) {
                return v.firstNumber + v.secondNumber
              }
            }
          }
        })
      },
      items: [{
        html: 'input',
        _type: 'number',
        step: 20,
        dataId: 'firstNumber',
        dataChanged: Mutate.Value,
        onInput: function (e, {data}) {
          data.set(Number(e.target.value))
        }
      }, {
        html: 'span',
        text: '+'
      }, {
        html: 'input',
        _type: 'number',
        step: 20,
        dataId: 'secondNumber',
        dataChanged: Mutate.Value,
        onInput: function (e, {data}) {
          data.set(Number(e.target.value))
        }
      }, {
        html: 'span',
        dataId: 'result',
        dataChanged: Mutate.Text
      }],
      $info: {
        html: 'p',
        weight: 10,
        items: [{
          type: AnimatedNumber,
          dataId: 'firstNumber',
          dataChanged: Mutate.Value
        }, {
          html: 'span',
          text: '+'
        }, {
          type: AnimatedNumber,
          dataId: 'secondNumber',
          dataChanged: Mutate.Value
        }, {
          html: 'span',
          text: '='
        }, {
          type: AnimatedNumber,
          dataId: 'result',
          dataChanged: Mutate.Value
        }]
      }
    }]
  }
}
