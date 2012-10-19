
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
					this.opt('text', this.options.format(this.data.id));//this.getParent(Ergo.widgets.PropertyPanel).options.propertyNameFormat(this.data.id)); 
				}
			}, {
				header: 'Значение'
			}]
			
		},
		
		propertyNameFormat: function(v) {
			return v;
		}
		
		
	},
	
	
	$pre_construct: function(o) {
		
		o.content.columns[0].format = o.propertyNameFormat;
		
		this.$super(o);
	}
	
	
}, 'property-panel');
