
//= require <widgets/grids/table-grid>

Ergo.declare('Ergo.widgets.PropertyGrid', 'Ergo.widgets.TableGrid', {
	
	defaults: {
		
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
			
			
		}],
				
		keyFormat: function(v) {
			return v;
		}
		
		
	},
	
	
	$pre_construct: function(o) {
		
		o.columns[0].content.keyFormat = o.keyFormat;
		
		this.$super(o);
	}
	
	
}, 'property-grid');
