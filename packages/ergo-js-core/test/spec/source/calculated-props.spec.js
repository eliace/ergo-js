const expect = require('chai').expect
import {Html, Source, Text, Domain, defaultCompare} from '../../../src'


describe ('Calculated properties', () => {

    it ('Should reconcile entries on calc', () => {

        const data = new Source({
          list: ['Alice', 'Bob', 'Charlie', 'Dave'],
          query: ''
        }, {
          properties: {
            filteredList: {
              calc: function (v) {
                return v.list.filter(s => s.toLowerCase().indexOf(v.query) != -1)
              }
            }
          }
        })
    
        const entriesBefore = []
    
        data.$entry('filteredList').$stream().entries((entry) => {
          entriesBefore.push(entry)
        })
    
        data.$set('query', 'c')

        const entriesAfter = []
    
        data.$entry('filteredList').$stream().entries((entry) => {
          entriesAfter.push(entry)
        })

//        debugger
    
        expect(entriesAfter[0]).to.equal(entriesBefore[0])
        expect(entriesAfter[1]).to.equal(entriesBefore[2])
    
    })
    


})
