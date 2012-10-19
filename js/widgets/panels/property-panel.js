
//= require <widgets/panel>

Ergo.declare('Ergo.widgets.PropertyPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		content: {
			etype: 'table-grid',
			
			content: {
				autoHeight: true						
			},
			
			columns: [{
				header: 'Наименование',
				binding: function(v) {
					this.opt('text', this.getParent(Ergo.widgets.PropertyPanel).options.propertyNameFormat(this.data.id)); 
				}
			}, {
				header: 'Значение'
			}]
			
		},
		
		propertyNameFormat: function(v) {
			return v;
		}
		
		
	}
	
	
}, 'property-panel');
