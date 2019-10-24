const expect = require('chai').expect
import {Html, Source, Text, Domain, defaultCompare} from '../../../src'


function x10list (initial) {
    const log = []
    const data = new Source(initial, {
        properties: {
            x10: {
                calc: (v) => v.map(x => x*10)
            }
        }
    })
    const html = new Html({
        sources: { 
            data: () => data.$entry('x10') 
        },
        dataChanged (v, s, k) {
            this.opt('items', s.$iterator(k))
        },
        defaultItem: {
            dataChanged: function (v) {
                this.opt('text', v)
            },
            dataJoined: function (j) {
                const v = j.$value
                log.push('+'+v)
                return () => {
                    log.push('-'+v)
                }
            }
        }
    })
    return {data, html, log}
}


describe ('Calculated items', () => {

    it ('Should add items', () => {
        const {data, html} = x10list([])

        data.$value = [1,2,3]

        expect(html.items.length).to.be.eq(3)
    })

    it ('Should remove items', () => {
        const {data, html} = x10list([1,2,3])

        data.$value = []

        expect(html.items.length).to.be.eq(0)
    })

    it ('Should remove center items', () => {
        const {data, html} = x10list([1,2,3,4,5])

        data.$value = [1,2,4,5]

        expect(html.items.length).to.be.eq(4)
        expect(html.items[0].text).to.be.eq('10')
        expect(html.items[1].text).to.be.eq('20')
        expect(html.items[2].text).to.be.eq('40')
        expect(html.items[3].text).to.be.eq('50')
    })

    it ('Should update items', () => {
        const {data, html} = x10list([1,2,3])

        data.$value = [4,5,6]

        expect(html.items.length).to.be.eq(3)
        expect(html.items[0].text).to.be.eq('40')
        expect(html.items[1].text).to.be.eq('50')
        expect(html.items[2].text).to.be.eq('60')
    })

    it ('Should update nested', () => {

        const data = new Source([1,2,3], {
            properties: {
                x10: {
                    calc: (v) => v.map(x => x*10)
                }
            }
        })
        const html = new Html({
            sources: { 
                data: () => data.$entry('x10') 
            },
            dataChanged (v, s, k) {
                this.opt('items', s.$iterator(k))
            },
            defaultItem: {
                dataChanged: function (v) {
                    this.opt('value', v)
                },
                $content: {
                    dataChanged: function (v) {
                        this.opt('text', v)
                    }    
                }
            }
        })
    
        data.$value = [4,5,6]

        expect(html.items.length).to.be.eq(3)
        expect(html.items[0].$content.text).to.be.eq('40')
        expect(html.items[1].$content.text).to.be.eq('50')
        expect(html.items[2].$content.text).to.be.eq('60')
    })

})