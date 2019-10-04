import {Html, Source, Domain, Layout} from '../../src'
import {Layouts, Box, IconBox, Button, Input, DropdownSelect, SplitButton, List, withDropdown, DropdownInput, DropdownButton} from '../../bulma'

import {ButtonWithIcon} from '../extensions'
//import {Mutate, Dropdownable as withDropdown} from '../helpers'
import {COUNTRIES} from '../constants'



export default () => {

  const dropdownInputData = new Domain({
    value: '',
    countries: COUNTRIES
  }, {
    properties: {
      filteredList: (v) => {
        return v.value ? v.countries.filter(c => c.name.toLowerCase().indexOf(v.value.toLowerCase()) != -1) : v.countries
      }
    }
  })

  return {
    sources: {
      selection: '',
//      dropdown: true,
      data: COUNTRIES,
    },
    layout: Layouts.Rows,
    items: [{
      sources: {
        state: () => {
          return {value: 'Guatemala'}
        },
        data: (o, ctx) => ctx.data
      },
      as: DropdownSelect,
      width: 400,
      $dropdown: {
        $content: {
          dataChanged: function (v, stream) {
            this.opt('items', stream)
          },
          defaultItem: {
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('value', v.name)
            }
          }
        }
      }
    }, {
      as: SplitButton,
      text: 'Button',
      color: 'info',
      $dropdown: {
        $content: {
          dataChanged: function (v, stream) {
            this.opt('items', stream)
          },
          defaultItem: {
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('value', v.name)
            }
          }
        }
      }
    }, {
      as: DropdownButton,
      text: 'Countries',
      sources: {
        list: () => COUNTRIES,
      },
      $dropdown: {
        defaultItem: {
          listChanged: function (v) {
            this.opt('text', v.name)
          }
        }
      }
    }, {
      as: DropdownInput,
      placeholder: 'Enter country name...',
      sources: {
        value: () => dropdownInputData.$entry('value'),
        list: () => dropdownInputData.$entry('filteredList'),
      },
      $dropdown: {
        defaultItem: {
          listChanged: function (v) {
            this.opt('text', v.name)
            this.opt('value', v.name)
          }
        }
      }
    }]
  }
}
