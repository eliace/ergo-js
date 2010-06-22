



Dino.declare('Dino.widgets.Grid', Dino.Container, {
	
	defaultCls: 'dino-grid',
	
	_html: function() { return '<table cellspacing="0" cellpadding="0" border="0"></table>'; },
	
	_init: function() {
		Dino.widgets.Grid.superclass._init.apply(this, arguments);
		
		// добавляем шапку
		this.thead = this.addItem( new Dino.widgets.Grid.Head() );
		var headRow = $('<tr>');
		
		var columns = this.options.dataModel.columns;
		for(var i in columns){
			var col = columns[i];
			
			var th = $('<th>');
			th.text(col.title);
			
			headRow.append(th);
		}
		
		this.thead.el.append(headRow);
				
		this.tbody = this.addItem( new Dino.widgets.Grid.Body() );
		
	},
	
	_opt: function(o) {
		Dino.widgets.Grid.superclass._opt.call(this, o);
				
		
	},
	
	_dataChanged: function() {
		
		var self = this;
		
		// обходим все значения коллекции
		this.data.eachValue(function(val, i){
			// добавляем элемент виджета
			var row = new Dino.widgets.Grid.Row({
				'columns': self.options.dataModel.columns,
				'data': self.data.getItem(i)
			});
			self.tbody.addItem(row);
//			row.dataChanged();
		});
		
//		Dino.widgets.Grid.superclass._dataChanged.call(this);
	}
	
	
}, 'grid');




Dino.declare('Dino.widgets.Grid.Head', Dino.Container, {
	defaultCls: 'dino-grid-head',
	_html: function() { return '<thead/>'; }
});

Dino.declare('Dino.widgets.Grid.Body', Dino.Container, {
	defaultCls: 'dino-grid-body',
	_html: function() { return '<tbody/>'; }
});



Dino.declare('Dino.widgets.Grid.Row', Dino.Container, {
	
	defaultCls: 'dino-grid-row',
	
	_html: function() { return '<tr></tr>'; },
	
	_init: function() {
		Dino.widgets.Grid.Row.superclass._init.apply(this, arguments);
		
		this.options.layout = {
			dtype: 'table-row-layout',
			columns: this.options.columns
		};
	},
	
	_opt: function(o) {
		Dino.widgets.Grid.Row.superclass._opt.call(this, o);
		
//		this.columns = {};
		
		for(var i in o.columns) {
			var col = o.columns[i];
			
			var item = this.addItem( Dino.object(Dino.override({dtype: 'label', data: this.data, dataId: col.name}, col)) );
			
//			this.columns[col.name] = item;
		}
		
	}

/*	
	dataChanged: function() {
		Dino.widgets.Grid.Row.superclass.dataChanged.call(this);
		
		this.eachItem(function(item) { item.dataChanged(); });
		
//		var self = this;
		
//		this.data.eachValue(function(val, i){
//			self.columns[i].setValue(val);
//		});
	}
*/	
})