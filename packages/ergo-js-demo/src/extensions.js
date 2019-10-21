import {Html} from 'ergo-js-core'
import {Layouts, Button, Buttons, IconBox, Box, Title} from 'ergo-js-bulma'

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


export class ExampleBox extends Box {
  config () {
    return {
      css: 'example',
      $header: {
        $title: {
          as: Title,
          css: 'is-6',
          styles: { 
            textTransform: 'uppercase',
            color: '#ccc',
            marginBottom: '1.5rem'
          }
        }
      },
      $description: {
        styles: {
          marginBottom: '1.5rem'
        }
      },
      $content: {

      },
      $code: {
        css: 'code-panel',
        $content: {
          html: 'pre',
          $content: {
            html: 'code',
            css: 'language-javascript',
          },
          dom: { Highlight }
        }
      }
    }
  }
  options () {
    return {
      example: {
        mix: function (v, mixer) {
          mixer.mix({
            $content: v
          })
        }
      },
      description: {
        mix: function (v, mixer) {
          mixer.mix({
            $description: {text: v}
          })
        }
      },
      code: {
        mix: function (v, mixer) {
          mixer.mix({
            $code: {text: v}
          })
        }
      },
    }
  }
  properties () {
    return {
      title: {
        set: function (v) {
          this.$header.$title.opt('text', v)
        }
      }
    }
  }
}
