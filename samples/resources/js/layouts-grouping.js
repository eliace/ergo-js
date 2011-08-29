
Ergo.DEBUG = true;


var listData = [
  {text: 'Alice', id: 1, group: '1'},
  {text: 'Charlie', id: 3, group: '2'},
  {text: 'Dean', id: 4, group: '3'},
  {text: 'Bob', id: 2, group: '1'},
  {text: 'Eva', id: 5, group: '3'},
];



var groupData = [{
  id: '1',
  text: 'Группа 1',
  users: [
    {text: 'Alice', id: 1, group: '1'},
    {text: 'Bob', id: 2, group: '1'},
  ]
}, {
  id: '2',
  text: 'Группа 2',
  users: [
    {text: 'Charlie', id: 3, group: '2'},
  ]
}, {
  id: '3',
  text: 'Группа 3',
  users: [
    {text: 'Dean', id: 4, group: '3'},
    {text: 'Eva', id: 5, group: '3'},
  ]
}];




$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Плоский список',
  cls: 'dino-border-all',
  content: {
    etype: 'list',
    data: listData,
    dynamic: true,
    cls: 'dino-text-content',
    
    defaultItem: {
      etype: 'text-item',
      style: {'display': 'block'},
      binding: function(val) {
        this.opt('text', val.text);
        this.options.group = val.group;
      }
    }    
  }
  
});




var groupLayout = Ergo.layouts.StatefulLayout.extend({
  
/*  
  insert: function(item) {
    
    if(!this.groups) this.groups = {};
    
    var g = item.data.get('group');
    
    if(!this.groups[g]) {
      var el = $('<div class="group-title">Group '+g+'</div>');
      this.groups[g] = el;
      this.el.append(el);
    }
    
    this.groups[g].after(item.el);
    
  }
*/

  
  rebuild: function() {
    
    var c = this.container;
    
    if(!this.groups) this.groups = {};
    
    var self = this;
    
    for(var i = this.items.length-1; i--; i>= 0) {
      
      var item = this.items[i];
      
      var g = item.data.get('group');
            
      if(!self.groups[g]) {
        var el = $('<div class="group-title">Hello</div>');
        self.groups[g] = el;
        self.el.append(el);
      }

      self.groups[g].after(item.el);      
    }
    
    // Ergo.each(this.items, function(item){
//       
    // });
    
    
  }

  
});




$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Сгруппированный список',
  cls: 'dino-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: listData,
    dynamic: true,
    cls: 'dino-text-content',
    layout: new groupLayout,
    
    defaultItem: {
      etype: 'text-item',
      style: {'display': 'block'},
      binding: function(val) {
        this.opt('text', val.text);
      }
    }    
  }
  
});







var baseDataSource = new Ergo.core.DataSource(listData);



var dataView = new Ergo.core.DataSource(baseDataSource);





/*
dataView._val = function() {
  if(arguments.length == 0) {
    
    var a = {};
    
    var val = Ergo.core.DataSource.prototype._val.call(this);
    Ergo.each(val, function(v){

      if(!(v.group in a)) {
        a[v.group] = {text: v.group, items: []};
      }

      a[v.group].items.push(v);
       
    });
    
    return a;
  }
  else {
    
  }
}
*/


/*
$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Плоский список',
  cls: 'dino-border-all',
  content: {
    etype: 'list',
    data: dataView,
    dynamic: true,
    cls: 'dino-text-content',
    
    defaultItem: {
      etype: 'text-item',
      style: {'display': 'block'},
      binding: function(val) {
        this.opt('text', val.text);
//        this.options.group = val.group;
      }
    }    
  }
  
});
*/


/*
var groupLayout2 = Ergo.layouts.PlainLayout.extend({
  
  insert: function(item) {

    var parentItem = this.container.parent.parent;
    
    console.log(item.el);
    
    parentItem.el.after(item.el);
    
  }
  
  
  
});

*/

$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Сгруппированный список',
  cls: 'dino-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: dataView,
    dynamic: true,
    cls: 'dino-text-content',
    
    defaultItem: {
      etype: 'box',
      components: {
        header: {
          etype: 'text-item',
          cls: 'group-title',
          style: {'display': 'block'},
          binding: function(val) {
            this.opt('text', val.text);
          }          
        },
        groupItemList: {
          dataId: 'items',
          etype: 'list',
          dynamic: true,
          defaultItem: {
            etype: 'text-item',
            style: {'display': 'block'},
            binding: function(val) {
              this.opt('text', val.text);
            }            
          }          
        }
      }
      
    }    
  }
  
});

