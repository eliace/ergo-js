import { Html, Domain } from 'chorda-core'
import { ButtonWithIcon } from '../extensions'
import ListDropdown from './ListDropdown'
import { withDropdown } from '../mixins'
import DropdownItem from './DropdownItem'
import { Button } from '../elements'

export default class DropdownSelect extends Html {
    config () {
      return {
        mix: { withDropdown },
        sources: {
          view: () => new Domain('', {
              properties: {
                placeholder: (v) => !v
              }
          }),
          dropdown: () => new Domain(false, {
            actions: {
              open: function () {
                this.$value = true
              },
              close: function () {
                this.$value = false
              }
            }
          })
        },
        dropdownChanged: function (v) {
          this.opt('active', !!v)
          this.opt('components', {dropdown: v})
        },
        viewChanged: function (v) {
          this.$content.$content.opt('text', v)
        },
        css: 'dropdown dropdown-select',
        $content: {
          onClick: function (e, {dropdown}) {
            dropdown.$toggle()
            e.nativeEvent.stopImmediatePropagation()
          },
          tabIndex: -1,
          css: 'dropdown-trigger',
          styles: {
            'width': '100%'
          },
          $content: {
            as: Button,//WithIcon,
            css: 'is-fullwidth',
            $icon: {
              weight: 10,
              css: 'is-small dropdown-icon',
              icon: 'fas fa-angle-down'
            },
            $content: {
              styles: {
                'display': 'flex',
                'flex': '1'
              }
            },
            $placeholder: {
              html: 'span',
              css: 'button-placeholder',
              // styles: {
              //   'display': 'flex',
              //   'flex': '1'
              // },
              text: 'Select me...'
            },
            components: {
              placeholder: false,
              icon: true,
              content: true
            },
            viewChanged: function (v, s) {
              this.opt('components', {placeholder: s.placeholder})
            }
          },
        },
        $dropdown: {
          css: 'dropdown-content is-hovered',
          styles: {
              display: 'block'
          },
          defaultItem: {
              as: DropdownItem,
              // dataChanged: function (v) {
              //     this.opt('text', v)
              // },
              onClick: function (e, {view, dropdown, modals}) {
                dropdown.close()
                view.$value = this.opt('value')
//                value.set(this.opt('value'))
//                  modals.close(dropdown)
              }
          },
          allJoined: function ({dropdown, modals}) {
            // dropdown.watch(e => e.name == 'init', () => {
            //   modals.open(dropdown)
            // }, this)
            // dropdown.watch(e => e.name == 'destroy', () => {
            //   modals.close(dropdown)
            // }, this)
            modals.open(dropdown)
            return () => {
              modals.close(dropdown)
            }
          }
    // css: 'dropdown-menu',
          // width: '100%',
          // $content: {
//            as: ListDropdown,
//            css: 'dropdown-content'
//          }
        }
      }
    }
    properties () {
      return {
        active: {
          set: function (v) {
            this.opt('classes', {'is-active': v})
          }
        }
      }
    }
  }
  