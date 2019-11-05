import Source from './Source'


export class Joint {
    constructor (key, source, target, channel, property) {
        this.key = key
        this.name = 'changed'
        this.source = source
        this.target = target
        this.channels = [].concat(channel)
        if (typeof property === 'function') {
            this.format = property    
        }
        else {
            this.property = property
        }
    }

    callback (e, s) {
        const v = e.data
//        console.log('update joint', s.key, v)
        this.opt(s.key, s.property ? v[s.property] : s.format(v, s.source, s.channels))
    }

    join (target, key) {
        this.key = key
        this.target = target
        this.source = target.sources[this.channels[0]]
        return this.source.subscribe(this)
    }

    unjoin () {
        this.source.unsubscribe(this.subscription)
    }

    isJoined () {
        return !!this.subscription
    }
}


export function joint (channel, property) {
    return new Joint(null, null, null, channel, property)
}

export function $value (channel, format) {
    return new Joint(null, null, null, channel, format || ((v, s, k) => v))
}
export function $iterator (channel, key) {
    return new Joint(null, null, null, channel, (v, s, k) => {return s.$iterator(key || k)})
}
