
//= require <widgets/items/button-item>
//= require <widgets/tool-box>



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
				etype: 'icon',
				hidden: true
			},
			title: {
				cls: 'title'
			},
			toolbox: {
				etype: 'tool-box',
				defaultItem: {
					etype: 'button-item'
				}
			}			
		}
		
	},
	
	
	$pre_construct: function(o) {
		this.$super(o);
		
		if(o.tools)
			Ergo.smart_override(o.components.toolbox, {items: o.tools});
	}
	
	
	
}, 'header-box');
