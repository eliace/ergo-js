

//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.TableGrid', 'Ergo.widgets.Box', {
	
	defaults: {
		
		components: {
			header: {
				cls: 'e-grid-header-wrapper',//Заголовок таблицы
				content: {
					etype: 'grid-header'
				}
			},
			content: {
				cls: 'e-grid-wrapper',				
				style: {'overflow': 'auto'},
				content: {
					etype: 'grid'
				}
			}
		},
		
		columns: [],
		row: {},
		cell: {}
		
	},
	
	
	
	$pre_construct: function(o) {
		
		var header_cols = [];
		for(var i = 0; i < o.columns.length; i++) {
			var h = {};
			var c = o.columns[i];
			if('header' in c) {
				if($.isPlainObject(c.header)) 
					Ergo.override(h, c.header);
				else
					h.text = c.header;
			}
			if('width' in c) h.width = c.width;
			if('hidden' in c) h.hidden = c.hidden;
			header_cols.push(h);
		}
		
		Ergo.smart_override(o.components.header.content, {columns: header_cols});
		Ergo.smart_override(o.components.content.content, {columns: o.columns, row: o.row, cell: o.cell});
		
		this.$super(o);
	},
	
	
	
	$layoutChanged: function() {
		this.$super();
		
		this.header.content.el.width(0);
		var w = this.content.content.el.width();
		this.header.content.el.width(w);
		
	},
	
	
	rows: function() {
		return this.content.content.items;
	}
	
	
}, 'table-grid');
