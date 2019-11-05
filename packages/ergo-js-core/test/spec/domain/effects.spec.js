const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect =chai.expect

import {Domain, Effect} from '../../../src'


const delay = function (t, msg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(msg)
      }, t)
    })
}

const delayReject = function (t, msg) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          reject(msg)
      }, t)
    })
}


const asyncWork = function (callback, timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(callback())
        }
        catch (err) {
          reject(err)
        }
      }, timeout || 1)
    })
}
  

describe ('Effects', () => {

  it ('Should create effect from subscriber', () => {
    const s = new Domain()
    s.$on('test', () => delay(1))
    const result = s.$emit('test', null, {effect: Effect})
    expect(result).to.be.instanceOf(Effect)
    expect(s.subscribers.filter(s => s instanceof Effect).length).to.be.eq(1)
    return result
  })

  it ('Should return async result', () => {
    const log = []
    const s = new Domain()
    s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))

    s.$on('test', () => delay(1, 'ok'))
    const result = s.$emit('test', null, {effect: Effect})
    return result.then((v) => {
        expect(v).to.be.eq('ok')
        expect(log).to.be.deep.eq(['test:', 'test:start', 'test:done'])
    })
  })

  it ('Should return async reject', (done) => {
    const log = []
    const s = new Domain()
    s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))

    s.$on('test', () => delayReject(1, 'stop'))
    const result = s.$emit('test', null, {effect: Effect})
    result.catch((err) => {
        expect(err).to.be.eq('stop')
        expect(log).to.be.deep.eq(['test:', 'test:start', 'test:fail'])
        done()
    })
  })

  it ('Should execute all works', (done) => {
    const log = []
    const s = new Domain()
    s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))

    s.$on('test', async () => {
        await delay(1)
        log.push('step1')
        await delay(1)
        log.push('step2')
        await delay(1)
        log.push('step3')
    })

    const result = s.$emit('test', null, {effect: Effect})
    result.then(() => {
        expect(log).to.be.deep.eq(['test:', 'test:start', 'step1', 'step2', 'step3', 'test:done'])
        done()
    })
  })

  it ('Should skip works if error', (done) => {
    const log = []
    const s = new Domain()
    s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))

    s.$on('test', async () => {
        await delay(1)
        log.push('step1')
        await delayReject(1)
        log.push('step2')
        await delay(1)
        log.push('step3')
    })

    const result = s.$emit('test', null, {effect: Effect})
    result.finally(() => {
//        console.log(log)
        expect(log).to.be.deep.eq(['test:', 'test:start', 'step1', 'test:fail'])
        done()
    })
  })

  describe ('Actions', () => {

    it ('Should execute all actions', (done) => {
        const log = []
        const s = new Domain()
        s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))
    
        const work1 = s.createAction('work1', () => delay(1))
        const work2 = s.createAction('work2', () => delay(1))
        const work3 = s.createAction('work3', () => delay(1))

        const allWorks = s.createAction('allWorks', async () => {
            await work1()
            log.push('step1')
            await work2()
            log.push('step2')
            await work3()
            log.push('step3')
        })

        allWorks().then(() => {
            console.log(log)
            done()
        })
    })

    it ('Should skip actions if error', (done) => {
        const log = []
        const s = new Domain()
        s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))
    
        const work1 = s.createAction('work1', () => delay(1))
        const work2 = s.createAction('work2', () => delayReject(1))
        const work3 = s.createAction('work3', () => delay(1))

        const allWorks = s.createAction('allWorks', async () => {
            await work1()
            log.push('step1')
            await work2()
            log.push('step2')
            await work3()
            log.push('step3')
        })

        allWorks().catch(() => {
            console.log(log)
            done()
        })
    })


    it ('Should skip actions if fail event', (done) => {
        const log = []
        const s = new Domain()
        s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))
    
        const work1 = s.createAction('work1', () => delay(1))
        const work2 = s.createAction('work2', () => {
            asyncWork(() => {
                s.subscribers.filter(eff => eff instanceof Effect && eff.name == 'work2').forEach(eff => {
                    eff.finalize('cancel')
                })
            }, 1)
            return delay(10)
        })
        const work3 = s.createAction('work3', () => delay(1))

        const allWorks = s.createAction('allWorks', async () => {
            await work1()
            log.push('step1')
            await work2()
            log.push('step2')
            await work3()
            log.push('step3')
        })

        allWorks().finally(() => {
            console.log(log)
            done()
        })
    })

    it ('Should cancel action chain', (done) => {
        const log = []
        const s = new Domain()
        s.$watch(() => true, (e) => log.push(e.name + ':' + e.channel))

        const work1 = s.createAction('work1', () => delay(10))
        const work2 = s.createAction('work2', () => work1())
        const work3 = s.createAction('work3', () => work2())
        const work4 = s.createAction('work4', () => work3())

        const allWorks = s.createAction('allWorks', async () => {
            await work4()
        })

        allWorks().finally(() => {
            console.log(log)
            done()
        })

        asyncWork(() => {
            s.subscribers.filter(eff => eff instanceof Effect && eff.name == 'work3').forEach(eff => {
                eff.finalize('cancel')
            })
        }, 1)

    })



  })

})
