
//= require "table-grid"

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
					var grid = this.getParent(Ergo.widgets.PropertyGrid);
					return grid.options.keyFormat(this.data.id);
				}
			},
			binding: false
		}, {
			header: 'Значение',
			binding: false,
			
			// mixins: ['editable'],
// 			
			// editor: {
				// etype: 'input-editor'
			// }
			
			// onDoubleClick: function(e) {
// 				
				// this.startEdit();
// 				
				// $('input', this.el).focus();
// 	     	
			// }				
			
			
			onBound: function() {
				
				var grid = this.getParent(Ergo.widgets.PropertyGrid);
				this.components.set('content', grid.options.editorFactory.apply(this));
				
			}
			
			
		}],
				
		keyFormat: function(v) {
			return v;
		},
		
		editorFactory: function() {			
			return {etype: 'input-editor'};
		}
		
		
	}
	
	// $pre_construct: function(o) {
// 		
		// // Параметры keyFormat и editorFactory приходится пробрасывать в параметры ячеек
		// //
		// //
		// o.columns[0].content.keyFormat = o.keyFormat;
		// o.columns[1].content.editorFactory = o.editorFactory;
// 		
		// this.$super(o);
	// }
	
	
}, 'property-grid');
