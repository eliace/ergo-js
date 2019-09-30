import { Layout, deepClone } from '../../src'

export default function withPortalSource (mixer) {
    mixer.merge({
        sources: {
            portal: (o, ctx) => ctx.portal
        },
        renderers: {
            '*': {
                update: function () {
                    this._dirty = true
                    this.sources.portal.emit('dirty')
                },
                render: () => {}
            },
            'portal': {
                render: function () {
                    const {html, props} = this._internal
                    const p = deepClone(props)
                    delete p.key
                    return Layout.simple(html, p, this.children || [])
                }
            }
        },
        portalJoined: function (s) {
            s.watch(e => e.name == 'init' && e.channel == 'portal', () => {
                s.$entry('components').$add(this)
            }, this)
            s.watch(e => e.name == 'destroy' && e.channel == 'portal', () => {
                s.$entry('components').find(this).$remove()//this)
            }, this)
        }
    })
}
