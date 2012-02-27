
//= require <widgets/panel>
//= require <extensions/window>


Ergo.declare('Ergo.widgets.Dialog', 'Ergo.widgets.Panel', {
	
	defaults: {
		extensions: ['window'],
//		renderTo: 'body',
		cls: 'e-dialog'
	}
	
	
/*	
	open: function() {
		this.layout.open();
		this.layout.update();
	},
	
	
	close: function(){
		this.layout.close();
	}
*/	
	
}, 'dialog');



