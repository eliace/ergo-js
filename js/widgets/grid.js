




Dino.declare('Dino.widgets.Grid', 'Dino.Widget', {
	
	defaultOptions: {
		wrapEl: '<div></div>',
		cls: 'dino-grid',
		components: {
			header: {
				dtype: 'box',
				content: {
					dtype: 'table',
					width: '100%',
					binding: false
				}
			},
			content: {
				// скроллируемый контейнер
				dtype: 'box',
				style: {'overflow-y': 'scroll'},
				content: {
					dtype: 'table',
					width: '100%'						
				}
			}
		}
	},
	
	
	
	_init: function() {
		Dino.widgets.Grid.superclass._init.apply(this, arguments);
		
		var o = this.options;
		
		// переносим параметр width из колонок в заголовки
		var h_columns = [];
		Dino.each(o.tableModel.columns, function(column, i){
			h_col = {};
			if('width' in column) h_col.width = column.width;
			h_columns[i] = h_col;
		})
		
		
		Dino.utils.overrideOpts(o.components.content.content, {'tableModel': o.tableModel});
		Dino.utils.overrideOpts(o.components.header.content, {'headerModel': o.headerModel || {}}, {headerModel: {columns: h_columns}});
		
	},
	
//	_opt: function(o) {
//		Dino.widgets.Grid.superclass._opt.apply(this, arguments);
//		
//		if('isDynamic' in o) this.content.body.opt('dynamic', true);
//	},
	
	
	_layoutChanged: function() {
		Dino.widgets.Grid.superclass._layoutChanged.apply(this, arguments);
		
		var tableWidth = this.content.content.el.width();
		this.header.content.el.width(tableWidth);
	}
	
	
	
	
}, 'grid');








