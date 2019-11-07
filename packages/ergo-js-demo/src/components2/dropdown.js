import {Html, Source, Domain, Layout} from 'chorda-core'
import {Layouts, Box, IconBox, Button, Input, DropdownSelect, SplitButton, List, withDropdown, DropdownInput, DropdownButton, ListBox} from 'chorda-bulma'

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
        view: () => 'Guatemala',
        data: (ctx, o) => ctx.data
      },
      as: DropdownSelect,
      width: 400,
      $dropdown: {
        dataChanged: function (v, s, k) {
          this.opt('items', s.$iterator(k))
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v.name)
            this.opt('value', v.name)
          }
        }
        // $content: {
        //   dataChanged: function (v, stream) {
        //     this.opt('items', stream)
        //   },
        //   defaultItem: {
        //     dataChanged: function (v) {
        //       this.opt('text', v.name)
        //       this.opt('value', v.name)
        //     }
        //   }
        // }
      }
    }, {
      as: SplitButton,
      text: 'Button',
      color: 'info',
      placeholder: 'Country',
      $dropdown: {
          dataChanged: function (v, s, k) {
            this.opt('items', s.$iterator(k))
          },
          defaultItem: {
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('value', v.name)
            }
          }
      }
    }, {
      as: DropdownButton,
      text: 'Countries',
      sources: {
        data: () => COUNTRIES,
      },
      $dropdown: {
        dataChanged: function (v, s, k) {
          this.opt('items', s.$iterator(k))
        },
        defaultItem: {
          dataChanged: function (v) {
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
    }, {
      as: DropdownButton,
      text: 'Countries',
      sources: {
        data: () => COUNTRIES,
      },
      $dropdown: {
        as: ListBox,
        dataChanged: function (v, s, k) {
          this.opt('items', s.$iterator(k))
        },
        defaultItem: {
          as: ListBox.Item,
          dataChanged: function (v) {
            this.opt('text', v.name)
            this.opt('image', v.flag)
          }
        }
      }
    }]
  }
}
