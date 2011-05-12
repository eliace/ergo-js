
//= require "../core/layout"


/**
 * @class
 * @extends Dino.Layout
 */
Dino.layouts.FormLayout = Dino.declare('Dino.layouts.FormLayout', 'Dino.Layout', /** @lends Dino.layouts.FormLayout.prototype */{
	
	defaultOptions: {
		name: 'form'
	},
	
	
	
	
	attach: function() {
		Dino.layouts.FormLayout.superclass.attach.apply(this, arguments);
		
		this.el = $('<table cellspacing="0" cellpadding="0" border="0"><tbody><tr></tr></tbody></table>');
		this.body_el = $('tbody', this.el);
		
		this.container.el.append(this.el);
	},
	
	detach: function() {
		Dino.layouts.FormLayout.superclass.detach.apply(this, arguments);
		this.el.remove();
	},
	
	
	
	insert: function(item){
		
		var o = item.options;
		
		var row = $('<tr><td class="label"></td><td></td></tr>');
		
		var labelEl = $('<label>'+(o.label || '')+'</label>');		
		$('td.label', row).append(labelEl);
		$('td', row).eq(1).append(item.el);
		
		this.el.append(row);
	}
	
	
	
}, 'form-layout');




/**
 * @class
 * @extends Dino.Layout
 */
Dino.layouts.SimpleFormLayout = Dino.declare('Dino.layouts.SimpleFormLayout', 'Dino.Layout', /** @lends Dino.layouts.SimpleFormLayout.prototype */{
	
	defaultOptions: {
		name: 'simple-form'
	},

	insert: function(item){

		var o = item.options;
		
		var wrapperEl = $('<div class="dino-form-item-wrapper"></div>');
		var labelEl = $('<label>'+(o.label || '')+'</label>');
		var label_pos = o.labelPosition || 'before';
		
		if('id' in item.options) labelEl.attr('for', item.options.id);
		
		if(label_pos == 'before')
			wrapperEl.append(labelEl).append(item.el);
		else if(label_pos == 'after')
			wrapperEl.append(item.el).append(labelEl);
		
		this.container.el.append(wrapperEl);
	}
	
	
}, 'simple-form-layout');	
	
