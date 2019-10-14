import {Html} from 'ergo-js-core'
import {Layouts, Button, Buttons, IconBox} from 'ergo-js-bulma'

import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'


function Highlight (el) {
  Prism.highlightAllUnder(el)
}

export class ButtonWithIcon extends Button {

  config () {
    return {
      $icon: {
        as: IconBox,
        css: 'is-small',
      },
      $content: {
        html: 'span',
        renderIfEmpty: false
      }
    }
  }

  options () {
    return {
      icon: {
        initOrSet: function (v) {
          this.$icon.opt('icon', v)
        }
      }
    }
  }

}


export class PreviewAndCode extends Html {
  config () {
    return {
      layout: Layouts.Columns,
      $preview: {
        column: 'is-half'
      },
      $code: {
        css: 'code-panel',
        column: 'is-half',
        $content: {
          html: 'pre',
          $content: {
            html: 'code',
            css: 'language-javascript',
          },
          dom: { Highlight }
          // ref: function (el) {
          //   if (el) {
          //     Prism.highlightAllUnder(el)
          //   }
          // }
        }
      }
    }
  }

  // configOptions () {
  //   return {
  //     src: {
  //       initOrSet: function (file) {
  //         debugger
  //         this.$code.opt('text', fs.readFileSync(__dirname+file, 'utf-8'))
  //       }
  //     }
  //   }
  // }
}
