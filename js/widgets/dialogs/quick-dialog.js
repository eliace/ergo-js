
//= require <widgets/dialogs/dialog>



Ergo.declare('Ergo.widgets.QuickDialog', 'Ergo.widgets.Dialog', {
	
	defaults: {
		cls: 'e-quick-dialog'		
	},
	
	
	open: function(callback) {
		this._callback = callback;
		this.$super();
	},
	
	close: function() {
		if(this._callback) this._callback.call(this, this._result);
		this.$super();
	}
	
}, 'quick-dialog');
