


Ergo.defineClass('Ergo.widgets.Table', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<table/>',
		components: {
			head: {
				etype: 'html:thead',
				defaultItem: {
					etype: 'table-row',
					defaultItem: {
						etype: 'html:th'
					}
				}
			},
			body: {
				etype: 'html:tbody',
				defaultItem: {
					etype: 'table-row'
				},
				dynamic: true
			}
		},
		row: {},
		cell: {}
	},
	
	
	$pre_construct: function(o) {

		if('columns' in o) {
			
			var hcols = [];
			var bcols = [];
			Ergo.each(o.columns, function(c){
				
				var col = {};
				
				if($.isString(c)) {
					col.header = c;
				}
				else {
					col = Ergo.deep_copy(c);
				}
				
				bcols.push(col);
				hcols.push(col.header);
				
				delete col.header;
			});
			
			Ergo.smart_override(o.components.head, {items: [{items: hcols}]});
			
			Ergo.smart_override(o.components.body, {defaultItem: o.row}, {defaultItem: {defaultItem: o.cell}}, {defaultItem: {items: bcols}});// items: [{items: hcols}]});
		}
		
		if('rows' in o) {

			Ergo.smart_override(o.components.body, {items: o.rows});
			
		}
		
		this.$super(o);
		
	}
	
	
	
}, 'widgets:table');





/*
Ergo.defineClass('Ergo.controllers.Columns', 'Ergo.core.Object', {
	
	
	initialize: function(widget) {
		this._widget = widget;
	},
	
	
	
	add: function(o) {
		// 1. добавляем опции в заголовок
		// 2. добавляем опции в строки
		// 3. добавляем ячейку в заголовок
		// 4. добавляем ячейку во все строки
	},
	
	
	get: function(i) {
		// получение чего-то 
	},
	
	
	remove_at: function(i) {
		
	}
	
	
	
});
*/




Ergo.defineClass('Ergo.widgets.TableRow', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<tr/>',
		defaultItem: {
			html: '<td/>'
//			etype: 'html:td'
		}
	}
	
}, 'widgets:table-row');







