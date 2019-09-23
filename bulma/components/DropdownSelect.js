import { Html, Domain } from '../../src'
import { ButtonWithIcon } from '../extensions'
import ListDropdown from './ListDropdown'

export default class DropdownSelect extends Html {
    config () {
      return {
        sources: {
          state: function () {
            return new Domain({})
          },
          dropdown: function () {
            return new Domain()
          }
        },
        dropdownChanged: function (v) {
          this.opt('active', !!v)
          this.opt('components', {dropdown: v})
        },
        stateChanged: function (v) {
          this.$content.$content.opt('text', v.value)
          this.$content.$content.opt('components', {placeholder: !v.value})
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
            as: ButtonWithIcon,
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
              css: 'dropdown-placeholder',
              styles: {
                'display': 'flex',
                'flex': '1'
              },
              text: 'Select me...'
            }
          },
        },
        $dropdown: {
          css: 'dropdown-menu',
          width: '100%',
          $content: {
            as: ListDropdown,
            css: 'dropdown-content'
          }
        }
      }
    }
    options () {
      return {
        active: {
          initOrSet: function (v) {
            this.opt('classes', {'is-active': v})
          }
        }
      }
    }
  }
  