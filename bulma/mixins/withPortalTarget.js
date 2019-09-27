import { Layout } from '../../src'

export default function withPortalTarget (mixer) {
    mixer.merge({
      sources: {
        portal: (o, ctx) => ctx.portal
      },
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
            const components = this.sources.portal.get('components').map(c => {
              return {
                render: () => c.render('portal')
              }
            })
            return Layout.simple(html, props, components)
          }
        }
      }
    })
}
    