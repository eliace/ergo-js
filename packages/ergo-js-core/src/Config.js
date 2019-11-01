import Source from './Source'
import Options from './Options'


function hasProperty (obj, i) {
    while (obj && obj.constructor !== Object) {
        if (obj.hasOwnProperty(i)) {
            return true
        }
        obj = Object.getPrototypeOf(obj)
    }
    return false
}


const Config = {
    HTML_OPTIONS: {},
    HTML_EVENTS: {},
    Renderer: {
        schedule: () => {}
    },
    defaultSource: Source,
    use: function (plugin) {
        plugin(this)
    },
    classes: new Map(),
    mixins: new Map(),
    getClassDescriptor: function (cls) {
        let desc = this.classes.get(cls)
        if (desc) {
            return desc
        }

        const proto = cls.prototype

        const baseProto = Object.getPrototypeOf(proto)
        let baseDesc = {}
        if (baseProto && baseProto.constructor !== Object) {
            baseDesc = this.getClassDescriptor(baseProto.constructor)
        }

        desc = {...baseDesc, proto}

        const mixins = this.mixins.get(cls)

        if (proto.hasOwnProperty('properties')) {
            desc.properties = {...desc.properties, ...proto.properties()}
        }

        if (proto.hasOwnProperty('options')) {
            desc.options = {...desc.options, ...proto.options()}
            // const options = {...proto.options()}
            // for (let i in options) {
            //     if (options.set) {
            //         desc.properties[i] = options[i]
            //     }
            //     else {
            //         desc.options[i] = options[i]
            //     }
            // }
            // for (let i in desc.options) {
            //     if (desc.options[i].set) {
            //         desc.properties[i] = desc.options[i]
            //     }
            // }
        }

        if (proto.hasOwnProperty('rules')) {
            desc.rules = {...desc.rules, ...proto.rules()}
        }

        if (proto.hasOwnProperty('config')) {
            const opts = new Options(desc.config)
            opts.mix(proto.config())

            if (mixins) {
                mixins.forEach(mixin => mixin(opts))
            }

            desc.config = opts.build(desc.rules)// {...desc.options, ...proto.options()}
        }

        for (let i in desc.properties) {
            if (!hasProperty(proto, i)) {
                Object.defineProperty(proto, i, {
                    get: desc.properties[i].get || function () {
                        return this._propsCache && this._propsCache[i]
                    },
                    set: desc.properties[i].set || function (v) {
                        this._propsCache && (this._propsCache = v)
                    }
                })
            }
        }

//        console.log(desc)

        this.classes.set(cls, desc)
        return desc
    },
    getSourceClassDescriptor: function (cls) {
        let desc = this.classes.get(cls)
        if (desc) {
            return desc
        }

        const proto = cls.prototype

        const baseProto = Object.getPrototypeOf(proto)
        let baseDesc = {config: {}, properties: {}}
        if (baseProto && baseProto.constructor !== Object) {
            baseDesc = this.getSourceClassDescriptor(baseProto.constructor)
        }

        desc = {...baseDesc, proto}

        if (proto.hasOwnProperty('config')) {
            const opts = new Options(desc.config)
            desc.config = opts.mix(proto.config()).build(desc.rules)// {...desc.options, ...proto.options()}
        }

        if (proto.hasOwnProperty('properties')) {
            desc.properties = {...desc.properties, ...proto.properties()}
        }

        if (desc.config.properties) {
            desc.properties = {...desc.properties, ...desc.config.properties}
        }

        for (let i in desc.properties) {
            if (!hasProperty(proto, i)) {
                if (desc.properties[i].type) {
                    Object.defineProperty(proto, i, {
                        get: function () {
                            return this.$entry(i)
                        },
                        // set: function (v) {
                        //     return this.$set(i, v)
                        // }
                    })    
                }
                else {
                    Object.defineProperty(proto, i, {
                        get: function () {
                            return this.$get(i)
                        },
                        set: function (v) {
                            return this.$set(i, v)
                        }
                    })    
                }
            }
        }

//        console.log(desc)

        this.classes.set(cls, desc)
        return desc        
    },
    mix: function (ctor, mixin) {
        let mixins = this.mixins.get(ctor)
        if (!mixins) {
            mixins = []
        }
        if (typeof mixin != 'function') {
            mixins.push((mixer) => mixer.mix(mixin))            
        }
        else {
            mixins.push(mixin)
        }
        this.mixins.set(ctor, mixins)
    }
}

export default Config