
var splitMove = null;

var treeData = new Ergo.core.DataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });



var box = $.ergo({
  etype: 'box',
  renderTo: '.preview',
  layout: 'border',
    style: {'margin': '8px'},
  height: 400,
  items: [{
    etype: 'box',
    width: 200,
    cls: 'e-border-all e-widget-shadow panel',
//    style: {'margin': '10px'},
    region: 'west',
    autoHeight: true,
    content: {
      etype: 'tree',
      isDynamic: true,
      autoHeight: true,
      data: treeData,
      treeModel: {
        node: {
          binding: function(val) {
            this.content.text.opt('icon', 'silk-icon-'+val.type);
            if(val.type != 'folder' && val.type != 'drive') this.opt('isLeaf', true);
          },
          content: {
            components: {
              text: {
                icon: true,
                dataId: 'name'                
              }
            }
          }
        }
      }
    }
  }, {
    etype: 'box',
    cls: 'e-border-all e-widget-shadow panel',
    autoHeight: true
  }, {
    etype: 'box',
    region: 'east',
    width: 150,
    autoHeight: true,
    cls: 'e-border-all e-widget-shadow panel'
  }, {
    etype: 'box',
    region: 'north',
    height: 100,
    cls: 'e-border-all e-widget-shadow panel'    
  }, {
    etype: 'box',
    region: 'south',
    height: 30,
    cls: 'e-border-all e-widget-shadow panel'    
  }]
});


    
