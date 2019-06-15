import {Html, Layouts} from '../../src'



class Check extends Html {
  static defaultOpts = {
    layout: Layouts.PassThrough,
    components: {
      input: {
        html: 'input',
        as: 'is-checkradio',
        _type: 'checkbox'
      },
      content: {
        html: 'label'
      }
    }
  }
  static OPTIONS = {
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

class Radio extends Html {
  static defaultOpts = {
    layout: Layouts.PassThrough,
    components: {
      input: {
        html: 'input',
        as: 'is-checkradio',
        _type: 'radio'
      },
      content: {
        html: 'label'
      }
    }
  }
  static OPTIONS = {
    checked: {
      initOrSet: function (v) {
        this.$input.opt('checked', v)
      }
    }
  }
}



export default (projector) => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      items: [{
        type: Check,
        checked: true,
        text: 'Check'
      }, {
        type: Check,
        text: 'Check'        
      }]
    }, {
      items: [{
        type: Radio,
        text: 'Radio 1',
        checked: true
      }, {
        type: Radio,
        text: 'Radio 2'
      }]
    }, {
      defaultItem: {
        type: Check,
        checked: true,
        components: {
          input: {
            as: 'is-block has-no-border'
          },
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
