const expect = require('chai').expect
import {Html} from '../../../src'


describe ('Inheritance', () => {

    it ('Should inherit properties', () => {
        class ClassA extends Html {
            properties () {
                return {
                    a: {}
                }
            }
        }
        class ClassB extends ClassA {
            config () {
                return {
                    a: 5
                }
            }
        }
        class ClassC extends ClassB {
            properties () {
                return {
                    b: {}
                }
            }
        }
        const html = new ClassC({
            a: 'Alice',
            b: 'Bob'
        })

        console.log('eq', html.constructor == ClassC)

//        debugger
        expect('a' in ClassA.prototype.classProps).to.be.true
        expect('a' in ClassB.prototype.classProps).to.be.true
        expect('a' in ClassC.prototype.classProps).to.be.true
        expect('b' in ClassC.prototype.classProps).to.be.true
        expect(html.prop('a')).to.be.eq('Alice')
        expect(html.prop('b')).to.be.eq('Bob')
    })


})