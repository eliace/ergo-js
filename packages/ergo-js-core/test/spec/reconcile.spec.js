const expect = require('chai').expect
import {Html, Source, Text, Domain, defaultCompare, joint as bind} from '../../src'


// class DataList extends Html {
//     config () {
//         return {
//             dataChanged (v, s) {
//                 this.opt('items', s)
//             },
//             defaultItem: {
//                 dataChanged: function (v) {
//                     this.opt('text', v)
//                 }
//             }
//         }
//     }
// }

function list (initial) {
    const log = []
    const data = new Source(initial)
    const html = new Html({
        sources: { data },
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


describe ('Reconcile', () => {

    describe ('Sync items (Array)', () => {

        it ('Should add items to empty list', () => {
            const {data, html} = list([])
    
            data.$value = [1,2,3]

            expect(html.items.length).to.be.eq(3)
            expect(html.items[0].text).to.be.eq('1')
            expect(html.items[1].text).to.be.eq('2')
            expect(html.items[2].text).to.be.eq('3')
        })
    
        it ('Should remove all items', () => {
            const {data, html} = list([1,2,3])
    
            data.$value = []
    
            expect(html.items.length).to.be.eq(0)
        })

        it ('Should remove center items', () => {
            const {data, html} = list([1,2,3,4,5])
    
            data.$value = [1,2,4,5]
    
            expect(html.items.length).to.be.eq(4)
            expect(html.items[0].text).to.be.eq('1')
            expect(html.items[1].text).to.be.eq('2')
            expect(html.items[2].text).to.be.eq('4')
            expect(html.items[3].text).to.be.eq('5')
        })

        // it ('Should remove center items (self)', () => {
        //     const arr = [1,2,3,4,5]
        //     const {data, html} = list(arr)
    
        //     arr.splice(2, 1)
        //     data.$value = arr
    
        //     expect(html.items.length).to.be.eq(4)
        //     expect(html.items[0].text).to.be.eq('1')
        //     expect(html.items[1].text).to.be.eq('2')
        //     expect(html.items[2].text).to.be.eq('4')
        //     expect(html.items[3].text).to.be.eq('5')
        // })
        
        it ('Should add tail items', () => {
            const {data, html} = list([1,2])
    
            data.$value = [1,2,3,4]
    
            expect(html.items.length).to.be.eq(4)
            expect(html.items[0].text).to.be.eq('1')
            expect(html.items[1].text).to.be.eq('2')
            expect(html.items[2].text).to.be.eq('3')
            expect(html.items[3].text).to.be.eq('4')
        })
    
        it ('Should add head items', () => {
            const {data, html} = list([3,4])
    
            data.$value = [1,2,3,4]
    
            expect(html.items.length).to.be.eq(4)
            expect(html.items[0].text).to.be.eq('3')
            expect(html.items[1].text).to.be.eq('4')
            expect(html.items[2].text).to.be.eq('1')
            expect(html.items[3].text).to.be.eq('2')
        })
    
        it ('Should reorder items', () => {
            const {data, html} = list([5,2,1,4,3])
    
            data.$value = [1,2,3,4,5]
    
            expect(html.items.length).to.be.eq(5)
            const sorted = html.items.sort(defaultCompare)
            expect(sorted[0].text).to.be.eq('1')
            expect(sorted[1].text).to.be.eq('2')
            expect(sorted[2].text).to.be.eq('3')
            expect(sorted[3].text).to.be.eq('4')
            expect(sorted[4].text).to.be.eq('5')
        })
    
        it ('Should merge and add tail and head', () => {
            const {data, html} = list([2,3])
    
            data.$value = [1,2,3,4,5]
    
            expect(html.items.length).to.be.eq(5)
            const sorted = html.items.sort(defaultCompare)
            expect(sorted[0].text).to.be.eq('1')
            expect(sorted[1].text).to.be.eq('2')
            expect(sorted[2].text).to.be.eq('3')
            expect(sorted[3].text).to.be.eq('4')
            expect(sorted[4].text).to.be.eq('5')
        })

        it ('Should move items', () => {
            const {data, html} = list([1,3])

            data.$value = [1,2,3]

            expect(html.items.length).to.be.eq(3)
        })
    
    })

    describe ('Sync items (Object)', () => {

        it ('Should add items to empty object', () => {
            const {data, html} = list({})
    
            data.$value = {a: 'Alice', b: 'Bob', c: 'Charlie'}

            expect(html.items.length).to.be.eq(3)
            expect(html.items[0].text).to.be.eq('Alice')
            expect(html.items[1].text).to.be.eq('Bob')
            expect(html.items[2].text).to.be.eq('Charlie')
        })

        it ('Should remove all items', () => {
            const {data, html} = list({a: 'Alice', b: 'Bob', c: 'Charlie'})
    
            data.$value = {}
    
            expect(html.items.length).to.be.eq(0)
        })

    })

    describe ('Join/unjoin', () => {

        it ('Should add items to empty list', () => {
            const {data, html, log} = list([])
    
            data.$value = [1,2,3]

            expect(log).to.be.deep.eq(['+1','+2','+3'])
        })

        it ('Should delete all items', () => {
            const {data, html, log} = list([1,2,3])
    
            data.$value = []

            expect(log).to.be.deep.eq(['+1','+2','+3','-1','-2','-3'])
        })

        it ('Should add items', () => {
            const {data, html, log} = list([1,2])
    
            data.$value = [1,2,3,4]

            expect(log).to.be.deep.eq(['+1','+2','+3','+4'])
        })

        it ('Should remove center items', () => {
            const {data, html, log} = list([1,2,3,4])
    
            data.$value = [1,4]

            expect(log).to.be.deep.eq(['+1','+2','+3','+4','-2','-3'])
        })

        it ('Should remove head items', () => {
            const {data, html, log} = list([1,2,3,4])
    
            data.$value = [2,3,4]

            expect(log).to.be.deep.eq(['+1','+2','+3','+4','-1'])
        })

        it ('Should sequentaly remove head items', () => {
            const {data, html, log} = list([1,2,3,4])
    
            data.$value = [2,3,4]
            data.$value = [3,4]
            data.$value = [4]
            data.$value = []

            expect(log).to.be.deep.eq(['+1','+2','+3','+4','-1','-2','-3','-4'])
        })

        it ('Should merge items', () => {
            const {data, html, log} = list([1,2,3])
    
            data.$value = [1,2,3,4,5]

            expect(log).to.be.deep.eq(['+1','+2','+3','+4','+5'])
        })

    })

})