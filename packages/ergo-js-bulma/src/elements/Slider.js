import { Html, Layout } from 'chorda-core'


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
    properties () {
        return {
            color: {
                set: function (v) {
                    this.opt('classes', {['is-'+v]: true})
                }
            },
            value: {
                set: function (v) {
                    this.sources.value.set(v)
                }
            }
        }
    }
  }
  