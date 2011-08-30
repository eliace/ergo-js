
$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  title: 'Панель',
  cls: 'ergo-panel-shadow ergo-border-all',
  style: {'margin': '8px'},
// buttons: ['close', 'minimize', 'maximize'],
  onHeaderButton: function(e) {
    if(e.button == 'collapse') {
//      var content = this.getParent(Ergo.widgets.Panel).content;
      if(this.content) {
        this.content.states.toggle('hidden');
        this.header.buttons.item({tag: e.button}).content.states.toggle('exp_col');                  
      }
    }    
  },
  components: {
    header: {
      components: {
        buttons: {
          defaultItem: {
            contentCls: 'ergo-icon-dialog',
          },
          items: [{
            icon: 'exp_col',
            tag: 'collapse',
            content: {
              states: {
                'exp_col': ['ergo-icon-dialog-collapse', 'ergo-icon-dialog-expand']
              }
            }
          }, {
            icon: 'ergo-icon-dialog-close'
          }]
        }
      }
    },
    content: {
      etype: 'box',
      style: {'padding': '3px'},
       content: {
        etype: 'box',
        height: 'auto',
        cls: 'ergo-widget-content ergo-border-all',
//        style: {'margin': '3px'},
        innerText: Samples.loremipsum        
      }
    }
  }
});

    
    
