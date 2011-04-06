    
$.dino({
  dtype: 'tree',
  renderTo: '.preview',
  cls: 'simple-tree',
  
  treeModel: {
    node: {
      cls: 'simple-tree-node',
      expandOnShow: true,
      components: {
        content: {
          cls: 'dino-clickable',
          icon: true,
          components: {
            leftIcon: {
              states: {
                'brick': 'led-icon-brick',
                'door': 'led-icon-door',
                'user': 'led-icon-user'
              }
            }
          },
          extensions: [Dino.Draggable, Dino.Droppable],
//          draggable: true,
          onDrag: function(e) {
            this.parent.states.set('dragged');
            
            e.dragContext.proxy = $.dino({
              dtype: 'text',
              text: this.getText(),
              cls: 'dino-border-all',
              style: {'background-color': '#fff'},
              opacity: .7
            });
            
            e.dragContext.offset = [-10, -10];
            
          },
          onDrop: function(e) {
            if(this != e.source)
              this.parent.subtree.addItem(e.source.parent);
              
            e.source.parent.states.clear('dragged');
          }
//          droppable: true          
        }    
      },
//      states: {
//        'dragged': 'dino-hidden'
//      }
    }
  },
  subtree: [{
    text: '1 этаж',
    icon: 'brick',
    toggleOnClick: true,
    subtree: [{
      text: 'каб. 111',
      icon: 'door',
      subtree: [{
//        state: ['user', 'leaf'],
        text: 'Волков А.А.',
        isLeaf: true,
        icon: 'user'
      }]
    }, {
      text: 'каб. 112',
      icon: 'door',
      subtree: [{
//        state: ['user', 'leaf'],
        text: 'Куницына А.Б.',
        isLeaf: true,
        icon: 'user'
      }, {
//        state: ['user', 'leaf'],
        text: 'Медведев Р.В.',
        isLeaf: true,
        icon: 'user'
      }]
    }, {
      text: 'каб. 113',
      icon: 'door'
    }]
  }]
});
    
