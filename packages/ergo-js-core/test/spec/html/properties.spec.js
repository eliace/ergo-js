const expect = require('chai').expect
import {Html} from '../../../src'


class ClassWithProps extends Html {
    properties () {
        return {
            simple: {}
        }
    }
}


describe ('Properties', () => {

    it ('Should set simple property by options', () => {
        const html = new ClassWithProps ({
            simple: 5
        })

        expect(html._propsCache.simple).to.be.eq(5)
    })

    it ('Should set simple property by prop', () => {
        const html = new ClassWithProps ({})
        html.prop('simple', 'hello')

        expect(html._propsCache.simple).to.be.eq('hello')
    })

    it ('Should get simple property by prop', () => {
        const html = new ClassWithProps ({
            simple: 'Alice'
        })

        expect(html.prop('simple')).to.be.eq('Alice')
    })

    it ('Should save detached component props', () => {
        const html = new Html({
            $label: {
                text: 'Hello'
            },
            components: false
        })
        expect(html.$$label).to.be.not.undefined
        expect(html.$label).to.be.undefined
        html.$$label.prop('text', 'Good bye')
        html.$$label.prop('classes', {'red': true})
        html.prop('components', {label: true})
        expect(html.$label).to.be.not.undefined
        expect(html.$label.text).to.be.eq('Good bye')
    })

    it ('Should use option defined properties', () => {
        const html = new Html({
            y: 10,
            properties: {
                y: {}
            }
        })
        expect(html.prop('y')).to.be.eq(10)
    })

    it ('Should detect property init order', () => {
        const html = new Html({
            a: 1,
            b: 5,
            properties: {
                a: {
                    set: function (v) {
                        this._a = this.opt('b') + v
                    }
                },
                b: {
                    set: function (v) {
                        this._b = v
                    }
                }
            }
        })
        expect(html._a).to.be.eq(6)
    })

})