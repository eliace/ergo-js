import { Layout, deepClone, Config } from 'chorda-core'

export default function withPortalSource (mixer) {
    mixer.merge({
        sources: {
            portal: (ctx, o) => ctx.portal
        },
        onDirty: function (e, {portal}) {
            this._dirty = true
            portal.emit('dirty')
            return false // останавливаем дальнейшую обработку
        },
        renderers: {
            '*': {
                // update: function () {
                //     // this._dirty = true
                //     // this.sources.portal.emit('dirty')
                //     this.notify('onDirty')
                // },
                render: () => {}
            },
            'portal': {
                render: function () {
                    const {html, props} = this.dom
                    const p = deepClone(props)
                    delete p.key // ключ не пригодится
                    return Layout.sorted(Config.Renderer.h, html, p, this.children || [])
                }
            }
        },
        portalJoined: function (s) {
            s.$watch(e => e.name == 'init' && e.channel == 'portal', () => {
                s.components.$add(this)//.$entry('components').$add(this)
            }, this)
            s.$watch(e => e.name == 'destroy' && e.channel == 'portal', () => {
                s.components.$find(this).$remove()
//                s.$entry('components').find(this).$remove()//this)
            }, this)
        }
    })
}
