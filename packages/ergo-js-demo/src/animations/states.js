import {Html, Domain, Text, Layout} from 'chorda-core'
import {Layouts} from 'chorda-bulma'

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

  config () {
    return {
      sources: {
        view: function () {
          return {
            tweeningValue: 0
          }
        },
        data: (ctx, o) => ctx.data || ''
      },
      html: 'span',
      viewChanged: function (v) {
        this.opt('text', v.tweeningValue)
      },
      allJoined: function ({view, data}) {

        data.watch((evt) => evt.name == 'changed'/* && evt.ids && ('value' in evt.ids)*/, (evt) => {
//          view.tween(evt.cache['value'] || 0, evt.data['value'])
          view.tween(evt.cache || 0, evt.data)
        }, this)

        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
          else {
            console.log('stop')
          }
        }

        function tween (start, end) {

          console.log('tween', start, end)

          new TWEEN.Tween({ tweeningValue: start })
            .to({ tweeningValue: end }, 500)
            .onUpdate(function (obj) {
              view.set('tweeningValue', obj.tweeningValue.toFixed(0))
            })
            .start()

          animate()
        }

        view.tween = tween
      }
    }
  }

  options () {
    return {
      value: {
        initOrSet: function (v) {
          this.sources.view.set('value', v)
        }
      }
    }
  }

}



export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: new Domain({
          number: 0,
          tweenedNumber: 0
        }, {
          properties: {
            animatedNumber: (v) => v.tweenedNumber.toFixed(0),
            number: {
              watch: function (v) {
                TweenLite.to(this.$props, 0.5, {tweenedNumber: v})
              }
            },
            tweenedNumber: {}
          }
        })
      },
      $input: {
        html: 'input',
        type: 'number',
        step: 20,
        dataId: 'number',
        dataChanged: function (v) {
          this.opt('value', v)
        },
        onChange: function (e, {data}) {
          data.set(e.target.value)
        }
      },
      $p: {
        html: 'p',
        dataId: 'animatedNumber',
        dataChanged: function (v) {
          this.opt('text', v)
        }
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
            properties: {
              updateInterval: {},
              points: {},
              minRadius: {},
              sides: {
                watch: function (next, prev) {
                  this.updateSides(next, prev)
                }
              },
              stats: {
                watch: function (next) {
                  this.updateStats(next)
                }
              }
            },
            actions: {
              updateSides: function (newSides, oldSides) {
                var sidesDifference = newSides - oldSides
                if (sidesDifference > 0) {
                	for (var i = 1; i <= sidesDifference; i++) {
                  	this.$entry('stats').$add(this.newRandomValue())
                  }
                } else {
                  var absoluteSidesDifference = Math.abs(sidesDifference)
                	for (var i = 1; i <= absoluteSidesDifference; i++) {
                    this.$entry('stats').$remove(0)
                  }
                }
              },
              updateStats: function (newStats) {
                const {$props} = this
          			TweenLite.to(
                	$props,
                  $props.updateInterval / 1000,
                  { points: generatePoints(newStats) }
              	)
              },
              newRandomValue: function () {
                const {$props} = this
               	return Math.ceil($props.minRadius + Math.random() * (100 - $props.minRadius))
              },
              randomizeStats: function () {
              	const {$props, newRandomValue} = this
                $props.stats = $props.stats.map(() => newRandomValue())
              },
              resetInterval: function () {
                const {$props, randomizeStats} = this
              	clearInterval(this.interval)
                randomizeStats()
              	this.interval = setInterval(function () {
                	randomizeStats()
                }, $props.updateInterval)
              }
            },
          })
        }
      },      
      dataJoined: function (data) {
        data.watch(e => e.name == 'init', () => {
          data.resetInterval()
        }, this)
        data.watch(e => e.name == 'destroy', () => {
          clearInterval(data.interval)
        }, this)
      },
      css: 'svg-polygon-example',
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
          layout: Layout.passthru,
          $label: {
            html: 'label',
            dataChanged: Mutate.Text
          },
          $input: {
            html: 'input',
            type: 'range',
            dataChanged: Mutate.Value,
            onChange: function (e, {data}) {
              data.set(Number(e.target.value))
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
            result: (v) => v.firstNumber + v.secondNumber
          }
        })
      },
      items: [{
        html: 'input',
        type: 'number',
        step: 20,
        dataId: 'firstNumber',
        dataChanged:function (v) {
          this.opt('value', v)
        },
        onChange: function (e, {data}) {
          data.set(Number(e.target.value))
        }
      }, {
        html: 'span',
        text: '+'
      }, {
        html: 'input',
        type: 'number',
        step: 20,
        dataId: 'secondNumber',
        dataChanged:function (v) {
          this.opt('value', v)
        },
        onChange: function (e, {data}) {
          data.set(Number(e.target.value))
        }
      }, {
        html: 'span',
        dataId: 'result',
        dataChanged:function (v) {
          this.opt('text', v)
        },
      }],
      $info: {
        html: 'p',
        weight: 10,
        items: [{
          as: AnimatedNumber,
          dataId: 'firstNumber',
          dataChanged: Mutate.Value
        }, {
          html: 'span',
          text: '+'
        }, {
          as: AnimatedNumber,
          dataId: 'secondNumber',
          dataChanged: Mutate.Value
        }, {
          html: 'span',
          text: '='
        }, {
          as: AnimatedNumber,
          dataId: 'result',
          dataChanged: Mutate.Value
        }]
      }
    }]
  }
}
