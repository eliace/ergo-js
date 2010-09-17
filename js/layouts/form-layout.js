

Dino.declare('Dino.layouts.FormLayout', 'Dino.Layout', {
	
	defaultOptions: {
		name: 'form'
	},
	
	
	insert: function(item){
		
		var wrapperEl = $('<div class="dino-form-item-wrapper"></div>');		
		var labelEl = $('<label>'+item.options.label+'</label>');
		
		if('id' in item.options) labelEl.attr('for', item.options.id);
		
//		var o = this.options;
//		
//		if('labelWidth' in o) labelEl.css('width', o.labelWidth);
	
		wrapperEl.append(labelEl).append(item.el);
		
/*		
		var formItem = Dino.widget({
			dtype: 'box',
			cls: 'dino-form-item-wrapper',
			items: [{
				dtype: 'label',
				text: item.options.label,
				forName: item.options.id
			}]
		});
		
		formItem.el.append(item.el);//.addItem(item);
		
		this.container.el.append(formItem.el);
*/
		this.container.el.append(wrapperEl);
		
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
	
