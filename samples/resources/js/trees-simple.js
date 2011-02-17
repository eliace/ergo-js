    
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
          showLeftIcon: true,
          components: {
            leftIcon: {
              states: {
                'brick': 'led-icon-brick',
                'door': 'led-icon-door',
                'user': 'led-icon-user'                
              }
            }
          }
        }        
      }
    }
  },
  subtree: [{
    text: '1 этаж',
    icon: 'brick',
//    toggleOnClick: true,
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
    
