
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



/*
$.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Плоский список',
  cls: 'ergo-border-all',
  content: {
    etype: 'list',
    data: listData,
    dynamic: true,
    cls: 'ergo-text-content',
    
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

*/


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
  title: 'Сгруппированный список (GroupLayout)',
  cls: 'ergo-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: listData,
    dynamic: true,
    cls: 'ergo-text-content',
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



/*
baseDataSource.group = function(field) {
	
	var groups = {};
	
	var values = this.val();
	
	Ergo.each(values, function(val){
		var group_id = val.group;
		if(!(group_id in groups)) {
			groups[group_id] = [];
		}
		groups[group_id].push(val);
	});
	
	var ds = new Ergo.core.DataSource(groups);
	
	// добавляем новое значение и автоматически выполняем группировку
	ds.add_and_group = function(val) {
		return this.entry(val.group).add(val);
	};
	
	// обновляем группировку
	ds.regroup = function() {
		
	};
	
	return ds;
};


baseDataSource.ungroup = function() {
	
};



var groupView = baseDataSource.group();
*/


var groupView = new Ergo.core.DataSource({});


groupView.factory = function(i) {
	var entry = new Ergo.core.DataSource(this, i);
	entry.entry = function(i) {
		var e = Ergo.core.DataSource.prototype.entry.apply(this, arguments);
		return e.get();
	};
	return entry;
}


baseDataSource.events.reg('value:changed', function(e){
	
	// создаем список групп
//	var val = e.newValue;
//	var groups = {};
	
	baseDataSource.iterate(function(entry, i){
		var group_id = entry.get('group');
		if(!(group_id in groupView.source)) {
			groupView.source[group_id] = [];
		}
		
		groupView.source[group_id].push(entry);
//		var gentry = groupView.entry(group_id);
//		gentry.entries.add(entry);
	});
	
	groupView.events.fire('value:changed');
	
});


baseDataSource.events.reg('entry:deleted', function(e){
	
	var entry = e.entry;
	
	// проверяем все группы
	groupView.iterate(function(g_entry, g_id, g_val){
		var i = Ergo.key_of(g_val, entry);
		g_entry.del(i);
	});
	
});


baseDataSource.events.reg('entry:added', function(e){
	
	var entry = e.entry;
	
	var group_id = entry.get('group');
			
	// добавляем элемент в группу, если его там еще нет
	var group_a = groupView.get(group_id);
	if(!group_a) {
		group_a = [];
		groupView.add(group_a, group_id);
	}
	if(!Ergo.include(group_a, entry)) {
		groupView.entry(group_id).add(entry);
//		console.log(groupView.entry(group_id).get());
	}
	
});




groupView.regroup = function() {
	
	baseDataSource.iterate(function(entry){
		var group_id = entry.get('group');
				
		// добавляем элемент в группу, если его там еще нет
		var group = groupView.get(group_id);
		if(!Ergo.include(group, entry)) {
			groupView.entry(group_id).add(entry);
		}
		
		// проверяем все группы на наличие элементов не в своих группах
		groupView.iterate(function(g_entry, g_id, g_val){
			var i = Ergo.key_of(g_val, entry);
			if(g_id != group_id && i != -1) {
//				var deleted_entry = g_entry.entry(i);
//				g_entry.entries.remove_at(i);
//				g_entry.events.fire('entry:deleted', {'entry': deleted_entry, 'value': null});
				g_entry.del(i);
			}
		});
		
		
//		var gentry = groupView.entry(group_id);
//		gentry.entries.add(entry);
	});
	
	
	
};



/*
baseDataSource.events.reg('entry:changed', function(e){
	
	console.log('aaa');
	
	var entry = e.entry;
	var group_id = entry.get('group');
	
	var dv_group = groupView.get(group_id);
	if(!Ergo.include(dv_group, entry.id)) {
		groupView.entry(group_id).add(entry.id);
	}
	
});
*/



/*
groupView._val = function() {
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
  cls: 'ergo-border-all',
  content: {
    etype: 'list',
    data: groupView,
    dynamic: true,
    cls: 'ergo-text-content',
    
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
  title: 'Сгруппированный список (GroupData)',
  cls: 'ergo-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: groupView,
    dynamic: true,
    cls: 'ergo-text-content',
    
    defaultItem: {
      etype: 'box',
      components: {
        header: {
          etype: 'text-item',
          cls: 'group-title',
          style: {'display': 'block'},
          binding: function(val) {
            this.opt('text', 'группа '+this.data.id);
          }          
        },
        groupItemList: {
//          dataId: 'items',
					id: 'foo',
          etype: 'list',
          dynamic: true,
          defaultItem: {
            etype: 'text-item',
            style: {'display': 'block'},
            content: {
            	dataId: 'text',
            	updateOnValueChange: true
            }
            // binding: function(val) {
            	// console.log(val);
              // this.opt('text', val.text);
            // },
          }          
        }
      }
      
    }    
  }
  
});


baseDataSource.events.fire('value:changed');

baseDataSource.set('0.text', 'Alice 2');

baseDataSource.set('0.group', '2'); // после изменения поля группировки слует явно вызвать перегруппировку
groupView.regroup();

baseDataSource.del(2);

baseDataSource.add({'text': 'Fox', 'group': '1'});
baseDataSource.add({'text': 'Gunde Svan', 'group': '4'});

