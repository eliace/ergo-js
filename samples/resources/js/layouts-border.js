
var splitMove = null;

var treeData = new Dino.data.ArrayDataSource([]);

$.getJSON('ajax/file_system.json', {}, function(data) { treeData.set(data) });



var box = $.dino({
  dtype: 'box',
  renderTo: '.preview',
  layout: 'border-layout',
    style: {'margin': '8px'},
  height: 400,
  items: [{
    dtype: 'box',
    width: 200,
    cls: 'dino-border-all dino-widget-shadow panel',
//    style: {'margin': '10px'},
    region: 'west',
    height: 'auto',
    content: {
      dtype: 'tree',
      isDynamic: true,
      height: 'auto',
      data: treeData,
      treeModel: {
        node: {
          binding: function(val) {
            this.opt('icon', 'led-icon-'+val.type);
            if(val.type != 'folder') this.opt('isLeaf', true);
          },
          content: {
            showLeftIcon: true,
            dataId: 'name'
          }
        }
      }
    }
  }, {
    dtype: 'box',
    cls: 'dino-border-all dino-widget-shadow panel',
    height: 'auto'
  }, {
    dtype: 'box',
    region: 'east',
    width: 150,
    height: 'auto',
    cls: 'dino-border-all dino-widget-shadow panel'
  }, {
    dtype: 'box',
    region: 'north',
    height: 100,
    cls: 'dino-border-all dino-widget-shadow panel'    
  }, {
    dtype: 'box',
    region: 'south',
    height: 30,
    cls: 'dino-border-all dino-widget-shadow panel'    
  }]
});


    
