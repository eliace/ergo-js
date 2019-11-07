import {Html} from 'chorda-core'
import {Layouts, Button, Buttons, IconBox, Box, Title, Card, Action} from 'chorda-bulma'

import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
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

// function plug (name) {
//   return 
// }

function slot (slot, component) {
  const c = component || slot
  return {
    ['$'+c]: {},
    slotsId: slot,
    slotsChanged: function (v) {
      this.opt('components', {[c]: v})
    }
  }
}


export class ExampleBox extends Card {
  config () {
    return {
      scope: {
        slots: {},
        view: {
          code: false
        }
      },
      css: 'example-box',
      $header: {
        css: 'example-box-header',
        layout: Layouts.Level,
        $title: {
          as: Title,
          css: 'example-box-title is-6',
          styles: { 
            textTransform: 'uppercase',
            color: '#ccc',
//            marginBottom: '1.5rem'
          },
          level: Layouts.Level.LEFT
        },
        $tools: {
          css: 'example-box-tools',
          level: Layouts.Level.RIGHT,
          $code: {
            as: Action,
            icon: 'fas fa-code',
            css: 'is-muted',
            onClick: function (e, {view}) {
              view.$toggle('code')
            }
          }
        },
        styles: {
          padding: '1rem',
          boxShadow: 'none',
          marginBottom: 0
        }
      },
      $description: {
        css: 'example-box-description',
        styles: {
          padding: '0 1rem'
        },
        weight: -10,
        ...slot('description', 'content'),
        $content: {
          layout: Layouts.Content
        },
        // slotsId: 'description',
        // slotsChanged: function (v) {
        //   this.opt('components', {content: v})
        // }
      },
      $content: {
        scope: {
          view: () => {},
          data: () => {}
        },
        css: 'example-box-content',
        styles: {
          display: 'flex',
          justifyContent: 'center'
        },
        ...slot('example', 'content')
      },
      $code: {
        weight: -5,
        css: 'code-panel example-box-code',
        ...slot('code', 'content'),
        $content: {
          html: 'pre',
          $content: {
            html: 'code',
            css: 'language-javascript',
          },
          dom: { Highlight }
        },
        // slotsId: 'code',
        // slotsChanged: function (v) {
        //   this.opt('text', v)
        // }
      },
      viewChanged: function (v) {
        this.opt('components', {code: v.code})
      }
    }
  }
  options () {
    return {
      // example: {
      //   mix: function (v, mixer) {
      //     mixer.mix({
      //       $content: {
      //         $content: v
      //       }
      //     })
      //   }
      // },
      // description: {
      //   mix: function (v, mixer) {
      //     mixer.mix({
      //       $description: {
      //         $content: {text: v}
      //       }  
      //     })
      //   }
      // },
      // code: {
      //   mix: function (v, mixer) {
      //     mixer.mix({
      //       $code: {text: v}
      //     })
      //   }
      // },
    }
  }
  properties () {
    return {
      title: {
        set: function (v) {
          this.$header.$title.opt('text', v)
        }
      },
      code: {
        set: function (v) {
          this.scope.slots.$set('code', {text: v})
        }
      },
      description: {
        set: function (v) {
          this.scope.slots.$set('description', v)
        }
      },
      example: {
        set: function (v) {
          this.scope.slots.$set('example', v)
        }
      }
    }
  }
}
