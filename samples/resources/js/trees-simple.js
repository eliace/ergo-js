    
$.ergo({
  etype: 'panel',
  title: 'Basic tree',
  renderTo: '.preview',
  cls: 'dino-border-all',
  
  width: 400,
  height: 300,
  
  
  content: {
    etype: 'tree',
    cls: 'simple-tree dino-text-content',
    
    height: 'auto',
    
    treeModel: {
      node: {
        cls: 'simple-tree-node',
        expandOnShow: true,
        components: {
          content: {
            components: {
              text: {
                icon: true,
                components: {
                  icon: {
                    states: {
                      'brick': 'silk-icon-brick',
                      'door': 'silk-icon-door',
                      'user': 'silk-icon-user'                
                    }
                  }
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
  
  }
  
});
    
