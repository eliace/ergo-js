
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
    {text: 'Alice', id: 1},
    {text: 'Bob', id: 2},
  ]
}, {
  id: '2',
  text: 'Группа 2',
  users: [
    {text: 'Charlie', id: 3},
  ]
}, {
  id: '3',
  text: 'Группа 3',
  users: [
    {text: 'Dean', id: 4},
    {text: 'Eva', id: 5},
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


var groupLayout = Ergo.layouts.PlainLayout.extend({
  
  update: function() {
    
    this.el.empty();
    
    var c = this.container;
    
    var groups = {};
    
    // получаем хэш групп
    c.children.each(function(child){
    	var g = child.data.get('group');
    	if(!(g in groups)) {
	    	groups[g] = {
	    		key: g,
	    		children: []
	    	};    		
    	}
    	groups[g].children.push(child);
    });
    
    var keys = [];
    // преобразуем хэш в массив
    for(var i in groups)
    	keys.push(i);
    	
    // сортируем массив ключей
    keys.sort();	
    
    for(var i = 0; i < keys.length; i++) {
    	var group = groups[keys[i]];
      var el = $('<div class="group-title">группа '+group.key+'</div>');
      this.el.append(el);
      
      for(var j = 0; j < group.children.length; j++) {
      	this.el.append( group.children[j].el );
      }
    }
    
  }

  
});







var baseDataSource = new Ergo.core.DataSource(listData);


var w = $.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Сгруппированный список (GroupLayout)',
  cls: 'ergo-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: baseDataSource,
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




baseDataSource.events.fire('value:changed');

baseDataSource.set('0.text', 'Alice 2');

baseDataSource.set('0.group', '2');

baseDataSource.del(2);

baseDataSource.add({'text': 'Fox', 'group': '1'});
baseDataSource.add({'text': 'Gunde Svan', 'group': '4'});


w.$layoutChanged();






/*
Ergo.declare('InheritedLayout2', 'Ergo.core.StatefulLayout', {
	
	initialize: function(o, parentLayout) {
		this.$super(o);
		this.parent = parentLayout;
	},
	
	insert: function(item, i) {
//	var parent = this.parent || this.container.parent.layout;
		var parent = this.parent.parent.layout;
			
		parent.insert(item, i);
	}
	
	
	
}, 'inherited2-layout');
*/




var groupLayout2 = Ergo.layouts.StatefulLayout.extend({
	
	
	update: function() {
		
		var self = this;
		
		this.container.walk(function(){
			if(this.layout instanceof Ergo.layouts.StatefulLayout) {
				var items = this.layout.items;
				for(var i = 0; i < items.length; i++)
					self.el.append( items[i].el );
			}
		});
		
				
	}
	
});





baseDataSource = new Ergo.core.DataSource(groupData);


w = $.ergo({
  etype: 'panel',
  renderTo: '.preview',
  width: 400,
  title: 'Сгруппированный список (GroupLayout)',
  cls: 'ergo-border-all',
  style: {'margin-top': 10},
  content: {
    etype: 'list',
    data: baseDataSource,
    dynamic: true,
    cls: 'ergo-text-content',
    layout: new groupLayout2(),
    
    defaultItem: {
      etype: 'text-item',
      style: {'display': 'block'},
      binding: function(val) {
        this.opt('text', val.text);
      },
      components: {
      	subitems: {
      		etype: 'list',
      		dataId: 'users',
      		dynamic: true,
      		layout: 'stateful',
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






/*

baseDataSource = new Ergo.core.DataSource(listData);




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

*/