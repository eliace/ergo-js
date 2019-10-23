const expect = require('chai').expect
import {Html, joint, Joint, Domain} from '../../../src'

const $value = (channel, format) => {
    return new Joint(null, null, null, channel, format || ((v, s, k) => v))
}
const $iterator = (channel, key) => {
    return new Joint(null, null, null, channel, (v, s, k) => {return s.$iterator(key || k)})
}


describe ('Sandbox', () => {

    it ('Should work', () => {

        const html = new Html({
            scope: {
                selected: null,
                list: ['Alice', 'Bob', 'Charlie']
            },
            defaultItem: {
                itemChanged: function(v) {
                    this.opt('text', v)
                },
                $num: {
                    itemChanged: function (v) {
                        this.opt('text', v.length)
                    }
                },
            },
            listChanged: function (v, s, k) {
                this.opt('items', s.$iterator('item')) // for item in list
            }
        })

        const html2 = new Html({
            scope: {
                selected: null,
                list: ['Alice', 'Bob', 'Charlie']
            },
            defaultItem: {
                text: $value('list'),
                $num: {
                    text: $value('list', v => v.length)
                },
            },
            items: $value('list')
        })


        console.log(html)
        console.log(html2)
    })



    it ('Should join', () => {

        class JoinClass extends Html {
            config () {
                return {
                    join: {
                        all: {JoinClass: function ({data}) {
                            data.createProperty('a')
                        }}
                    }
                }
            }
        }

        const html = new JoinClass({
            scope: {
                data: () => new Domain({})
            },
            join: {
                all: {test: function ({data}) {
                    data.createProperty('b')
                }}
            }
        })

        console.log(html)
    })

})