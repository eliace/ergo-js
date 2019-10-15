


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
        this.opt(s.key, s.property ? v[s.property] : s.format(v))
    }

    join (target, key) {
        this.key = key
        this.target = target
        this.source = target.sources[this.channels[0]]
        this.source.subscribe(this)
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