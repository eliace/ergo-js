
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
				content: {
					etype: 'text',
					format: function(v) {
						return this.options.keyFormat(this.data.id);
					}
				},
				binding: false
			}, {
				header: 'Значение',
				binding: false,
				content: {
					etype: 'text'
				},
				
				mixins: ['editable'],
				
				state: 'no-selection',
				
				editor: {
					etype: 'input-editor'
				},
				
				onDoubleClick: function(e) {
					
					this.startEdit();
					
					$('input', this.el).focus();
		      		      
				}				
				
				
			}]
			
		},
		
		keyFormat: function(v) {
			return v;
		}
		
		
	},
	
	
	$pre_construct: function(o) {
		
		o.content.columns[0].content.keyFormat = o.keyFormat;
		
		this.$super(o);
	}
	
	
}, 'property-panel');
