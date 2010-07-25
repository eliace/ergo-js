

Dino.declare('Dino.layouts.FormLayout', 'Dino.Layout', {
	
	insert: function(item){
		
		var formItem = Dino.widget({
			dtype: 'box',
			cls: 'dino-form-item-wrapper',
			items: [{
				dtype: 'label',
				text: item.options.label,
				forName: item.options.name
			}]
		});
		
		formItem.el.append(item.el);//.addItem(item);
		
		this.container.el.append(formItem.el);
	}
	
	
	
}, 'form-layout');