

Dino.declare('Dino.layouts.FormLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'form'
	},
	
	
	
	
	attach: function() {
		Dino.layouts.FormLayout.superclass.attach.apply(this, arguments);
		
		this.el = $('<table cellspacing="0" cellpadding="0" border="0" style="width:100%"><tbody><tr></tr></tbody></table>');
		this.body_el = $('tbody', this.el);
		
		this.container.el.append(this.el);
	},
	
	detach: function() {
		Dino.layouts.FormLayout.superclass.detach.apply(this, arguments);
		this.el.remove();
	},
	
	
	
	insert: function(item){
		
		var row = $('<tr><td class="label"></td><td></td></tr>');
		
		$('td.label', row).append('<label>' + item.options.label + ':' + '</label>');
		$('td', row).eq(1).append(item.el);
		
		this.el.append(row);
	}
	
	
	
}, 'form-layout');





Dino.declare('Dino.layouts.SimpleFormLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'simple-form'
	},

	insert: function(item){
		
		var wrapperEl = $('<div class="dino-form-item-wrapper"></div>');		
		var labelEl = $('<label>'+item.options.label+'</label>');
		
		if('id' in item.options) labelEl.attr('for', item.options.id);
		
		wrapperEl.append(labelEl).append(item.el);
		
		this.container.el.append(wrapperEl);
	}
	
	
}, 'simple-form-layout');	
	
