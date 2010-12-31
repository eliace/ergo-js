


/**
 * @class
 * @extends Dino.layouts.PlainLayout
 */
Dino.layouts.ColumnLayout = Dino.declare('Dino.layouts.ColumnLayout', 'Dino.layouts.PlainLayout', /** @lends Dino.layouts.ColumnLayout.prototype */{
	
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
//		var col_width = 0;
//		if('columnWidth' in item.options) col_el.width(item.options.width);		
		if('width' in item.options) {
			item.el.css('width', null);
			col_el.width(item.options.width);
		}
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

