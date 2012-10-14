
//= require <widgets/items/button-item>



/*
Ergo.declare('Ergo.widgets.HeaderBox', 'Ergo.widgets.Box', {
	
	defaults: {
		
		cls: 'e-header-box',
		
		components: {
			title: {
				cls: 'title',
				layout: 'hbox'
			},
			toolbox: {
				cls: 'toolbox',
				layout: 'hbox',
				defaultItem: {
					etype: 'button-item'
				}
			}
		}
		
	}
	
	
}, 'header-box');
*/


Ergo.declare('Ergo.widgets.HeaderBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-toolbox-header',
		
		components: {
			icon: {
				etype: 'icon'
			},
			title: {
				cls: 'title'
			},
			tools: {
				cls: 'toolbox',
				layout: 'hbox',
				defaultItem: {
					etype: 'button-item'
				}
			}			
		}
		
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		if(o.tools)
			Ergo.smart_override(o.components.tools, {items: o.tools});
	}
	
	
	
}, 'header-box');
