
//= require <widgets/panel>

Ergo.declare('Ergo.plugns.GridPanel', 'Ergo.widgets.Panel', {
	
	defaults: {
		
		components: {
			
			header: {
				etype: 'header-box',
				autoBind: false
			},
			
			content: {
				etype: 'table-grid',
				
				content: {
					autoHeight: true						
				}
			},
			
			footer: {
				content: {
					etype: 'tool-box',
					components: {
						paginator: {
							etype: 'grid-paginator',
							weight: 10							
						}
					}
				},
				hidden: false						
			}
			
		},
		
		onPageChanged: function(e) {
			
			this.$layoutChanged();
			
			e.stop();
		}
		
	}
	
	
}, 'grid-panel');
