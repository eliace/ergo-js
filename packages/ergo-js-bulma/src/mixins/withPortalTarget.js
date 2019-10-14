import { Layout, Domain } from 'ergo-js-core'
import { Collection } from '../utils'

export default function withPortalTarget (mixer) {
    mixer.merge({
      sources: {
        portal: () => new Domain({
          components: []
        }, {
          properties: {
            components: {
              type: Collection
            }
          }
        })
      },
      $portal: {
        styles: {
          position: 'absolute',
          zIndex: 100,
          left: 0,
          top: 0
        },
        portalJoined: function (s) {
          s.on('dirty', () => {
            this.rerender()
          }, this)
        },
        renderers: {
          '*': {
            render: function () {
              const {html, props} = this._internal
              const components = this.sources.portal.components.get().map(c => {
                return {
                  render: () => c.render('portal')
                }
              })
              return Layout.simple(html, props, components)
            }
          }
        }
      }
    })
}
    