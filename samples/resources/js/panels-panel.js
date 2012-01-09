
$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  title: 'Панель',
  cls: 'e-panel-shadow e-border-all',
  style: {'margin': '8px'},
// buttons: ['close', 'minimize', 'maximize'],
  onHeaderButton: function(e) {
    if(e.button == 'collapse') {
//      var content = this.getParent(Ergo.widgets.Panel).content;
      if(this.content) {
        this.content.states.toggle('hidden');
        this.header.buttons.item({tag: e.button}).content.states.toggle('expand-collapse');                  
      }
    }    
  },
  components: {
    header: {
      components: {
        buttons: {
          defaultItem: {
            contentCls: 'e-icon-dialog',
          },
          items: [{
            icon: 'expand-collapse',
            tag: 'collapse',
            content: {
              states: {
                'expand-collapse': Ergo.on('e-icon-dialog-collapse').off('e-icon-dialog-expand')
              }
            }
          }, {
            icon: 'e-icon-dialog-close'
          }]
        }
      }
    },
    content: {
      etype: 'box',
      style: {'padding': '3px'},
       content: {
        etype: 'box',
        autoHeight: true,
        cls: 'e-widget-content e-border-all',
//        style: {'margin': '3px'},
        innerText: Samples.loremipsum        
      }
    }
  }
});

    
    
