
$.dino({
  dtype: 'panel',
  renderTo: '.preview',
  title: 'Панель',
  cls: 'dino-panel-shadow dino-border-all',
  style: {'margin': '8px'},
// buttons: ['close', 'minimize', 'maximize'],
  onHeaderButton: function(e) {
    if(e.button == 'collapse') {
//      var content = this.getParent(Dino.widgets.Panel).content;
      if(this.content) {
        this.content.states.toggle('hidden');
        this.header.buttons.items.find(e.button).content.states.toggle('exp_col');                  
      }
    }    
  },
  components: {
    header: {
      components: {
        buttons: {
          defaultItem: {
            contentCls: 'dino-icon-dialog',
          },
          items: [{
            icon: 'exp_col',
            tag: 'collapse',
            content: {
              states: {
                'exp_col': ['dino-icon-dialog-collapse', 'dino-icon-dialog-expand']
              }
            }
          }, {
            icon: 'dino-icon-dialog-close'
          }]
        }
      }
    },
    content: {
      dtype: 'box',
      style: {'padding': '3px'},
       content: {
        dtype: 'box',
        height: 'auto',
        cls: 'dino-widget-content dino-border-all',
//        style: {'margin': '3px'},
        innerText: Samples.loremipsum        
      }
    }
  }
});

    
    
