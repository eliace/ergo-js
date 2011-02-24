
$.dino({
  dtype: 'panel',
  renderTo: '.preview',
  title: 'Панель',
  cls: 'dino-panel-shadow',
  style: {'margin': '8px'},
// buttons: ['close', 'minimize', 'maximize'],
  components: {
    header: {
      layout: {
        dtype: 'dock-layout',
        updateMode: 'auto'
      },
      components: {
        buttons: {
        dtype: 'box',
        dock: 'right',
        layout: 'float-layout',
        defaultItem: {
          dtype: 'icon-button',
          cls: 'dino-header-button dino-corner-all',
          contentCls: 'dino-icon-dialog',
          onAction: function(){
            if(this.tag == 'collapse') {
              var content = this.getParent(Dino.widgets.Panel).content;
              if(content) {
                content.states.toggle('hidden');
	              this.content.states.toggle('exp_col');									
              }
            }
          }
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
   height: 'auto',
   cls: 'dino-widget-content dino-border-all',
   style: {'margin': '3px'},
   innerText: Samples.loremipsum
  }
 }
});

    
    
