


Dino.declare('Dino.layouts.RowLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'row'
	},

	insert: function(item) {
		
//		if(!this.innerEl){
//			this.innerEl = $('<div layout="row"></div>');
//			this.container.el.append(this.innerEl);
//		}
		
		var wrapperEl = $('<div></div>');
		wrapperEl.append(item.el);
		this.container.el.append( wrapperEl );
		
		if('itemCls' in this.options) item.el.addClass(this.options.itemCls);
	},
	
	remove: function(item) {
		item.el.parent().remove();
		if('itemCls' in this.options) item.el.removeClass(this.options.itemCls);
	},
	
	clear: function() {
		this.container.el.empty();
	}
	
	
}, 'row-layout');





Dino.declare('Dino.layouts.ColumnLayout', 'Dino.layouts.PlainLayout', {
	
	defaultOptions: {
		name: 'column',
		valign: 'top'
//		autoHeight: true
	},
	
	attach: function() {
		Dino.layouts.ColumnLayout.superclass.attach.apply(this, arguments);
		
		this.el = $('<table cellspacing="0" cellpadding="0" border="0" style="width:100%"><tbody><tr></tr></tbody></table>');
		this.row_el = $('tr', this.el);
		
		this.container.el.append(this.el);
	},
	
	detach: function() {
		Dino.layouts.ColumnLayout.superclass.detach.apply(this, arguments);
		this.el.remove();
	},
	
	insert: function(item, key) {
		var col_el = $('<td style="vertical-align: '+this.options.valign+'"></td>');
		if('width' in item.options) col_el.width(item.options.width);
		col_el.append( item.el );
		
		this.row_el.append(col_el);
	},
	
	remove: function(item) {
		item.el.parent().remove();
	},
	
	clear: function() {
		this.row_el.empty(); //FIXME
	}	
	
}, 'column-layout');

