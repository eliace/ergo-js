
//= require "plain"


/**
 * @class
 * @extends Dino.core.Layouts.PlainLayout
 */
Dino.core.Layouts.ColumnLayout = Dino.declare('Dino.core.Layouts.ColumnLayout', 'Dino.core.Layouts.PlainLayout', /** @lends Dino.core.Layouts.ColumnLayout.prototype */{
	
	defaults: {
		name: 'column',
		valign: 'top'
//		autoHeight: true
	},
	
	attach: function() {
		Dino.core.Layouts.ColumnLayout.superclass.attach.apply(this, arguments);
		
		this.el = $('<table cellspacing="0" cellpadding="0" border="0" style="width:100%"><tbody><tr></tr></tbody></table>');
		this.row_el = $('tr', this.el);
		
		this.container.el.append(this.el);
	},
	
	detach: function() {
		Dino.core.Layouts.ColumnLayout.superclass.detach.apply(this, arguments);
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
	},
	
	update: function() {
		var self = this;
		this.container.children.each(function(child, i) {
				var col_el = $('> td', self.row_el).eq(i);
				col_el.width(child.options.width);
		});
	}
	
}, 'column-layout');

