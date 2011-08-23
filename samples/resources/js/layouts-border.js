
var splitMove = null;

var treeData = new Ergo.core.DataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });



var box = $.ergo({
  etype: 'list',
  renderTo: '.preview',
  layout: 'border',
    style: {'margin': '8px'},
  height: 400,
  items: [{
    etype: 'box',
    width: 200,
    cls: 'dino-border-all dino-widget-shadow panel',
//    style: {'margin': '10px'},
    region: 'west',
    height: 'auto',
    content: {
      etype: 'tree',
      isDynamic: true,
      height: 'auto',
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
    cls: 'dino-border-all dino-widget-shadow panel',
    height: 'auto'
  }, {
    etype: 'box',
    region: 'east',
    width: 150,
    height: 'auto',
    cls: 'dino-border-all dino-widget-shadow panel'
  }, {
    etype: 'box',
    region: 'north',
    height: 100,
    cls: 'dino-border-all dino-widget-shadow panel'    
  }, {
    etype: 'box',
    region: 'south',
    height: 30,
    cls: 'dino-border-all dino-widget-shadow panel'    
  }]
});


    
