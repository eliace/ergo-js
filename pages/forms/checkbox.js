import {Html, Layout} from '../../src'
import {Layouts} from '../../bulma'



class Check extends Html {
  config () {
    return {
      layout: Layout.passthru,
      $input: {
        html: 'input',
        css: 'is-checkradio',
        type: 'checkbox'
      },
      $content: {
        html: 'label'
      }
    }
  }

  configOptions () {
    return {
      checked: {
        initOrSet: function (v) {
          this.$input.opt('checked', v)
        }
      },
      block: {
        initOrSet: function (v) {
          this.$input.opt('classes', {'is-block': v})
        }
      }
    }
  }
}

class Radio extends Html {
  config () {
    return {
      layout: Layout.passthru,
      $input: {
        html: 'input',
        css: 'is-checkradio',
        type: 'radio'
      },
      $content: {
        html: 'label'
      }
    }
  }

  configOptions () {
    return {
      checked: {
        initOrSet: function (v) {
          this.$input.opt('checked', v)
        }
      }
    }
  }
}



export default () => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      items: [{
        as: Check,
        checked: true,
        text: 'Check'
      }, {
        as: Check,
        text: 'Check'
      }]
    }, {
      items: [{
        as: Radio,
        text: 'Radio 1',
        checked: true
      }, {
        as: Radio,
        text: 'Radio 2'
      }]
    }, {
      defaultItem: {
        as: Check,
        checked: true,
        $input: {
          css: 'is-block has-no-border'
        },
        text: 'Check'
      },
      items: [{
      }, {
        $input: {
          css: 'is-primary'
        }
      }, {
        $input: {
          css: 'is-info'
        }
      }]
    }]
  }
}
