



Dino.declare('Dino.widgets.Grid', Dino.Container, {
	
	defaultCls: 'dino-grid',
	
	renderHtml: function() { return '<table cellspacing="0" cellpadding="0"></table>'; },
	
	initialize: function(o) {
		Dino.widgets.Grid.superclass.initialize.call(this, o);
		
	},
	
	options: function(o) {
		Dino.widgets.Grid.superclass.options.call(this, o);
				
		
	},
	
	dataChanged: function() {
		
		var self = this;
		
		// обходим все значения коллекции
		this.data.eachValue(function(val, i){
			// добавляем элемент виджета
			var row = new Dino.widgets.Grid.Row({
				'columns': self.opts.dataModel.columns,
				'data': self.data.getItem(i)
			});
			self.addItem(row);
//			row.dataChanged();
		});
		
		Dino.widgets.Grid.superclass.dataChanged.call(this);
	}
	
	
}, 'grid');


Dino.declare('Dino.widgets.Grid.Row', Dino.Container, {
	
	defaultCls: 'ui-widget-content',
	
	renderHtml: function() { return '<tr></tr>'; },
	
	initialize: function(o) {
		Dino.widgets.Grid.Row.superclass.initialize.call(this, o);
		
		o.layout = {
			dtype: 'table-row-layout',
			columns: o.columns
		};
	},
	
	options: function(o) {
		Dino.widgets.Grid.Row.superclass.options.call(this, o);
		
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