import { Html, Layout } from 'ergo-js-core'


export default class Slider extends Html {
    config () {
      return {
            sources: {
                value: () => 0
            },
            html: 'input',
            css: 'slider',
            type: 'range',
            onChange: function (e, {value}) {
                value.set(Number(e.target.value))
            }
      }
    }
    options () {
        return {
            color: {
                initOrSet: function (v) {
                    this.opt('classes', {['is-'+v]: true})
                }
            },
            value: {
                initOrSet: function (v) {
                    this.sources.value.set(v)
                }
            }
        }
    }
  }
  