import {Html, Layout, Layouts} from '../../src'



class Check extends Html {
  config () {
    return {
      layout: Layout.Passthru,
      $input: {
        html: 'input',
        as: 'is-checkradio',
        _type: 'checkbox'
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
      layout: Layout.Passthru,
      $input: {
        html: 'input',
        as: 'is-checkradio',
        _type: 'radio'
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
        base: Check,
        checked: true,
        text: 'Check'
      }, {
        base: Check,
        text: 'Check'
      }]
    }, {
      items: [{
        base: Radio,
        text: 'Radio 1',
        checked: true
      }, {
        base: Radio,
        text: 'Radio 2'
      }]
    }, {
      defaultItem: {
        base: Check,
        checked: true,
        $input: {
          as: 'is-block has-no-border'
        },
        text: 'Check'
      },
      items: [{
      }, {
        $input: {
          as: 'is-primary'
        }
      }, {
        $input: {
          as: 'is-info'
        }
      }]
    }]
  }
}
