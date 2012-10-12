
//= require "model"


Ergo.declare('Ergo.data.AjaxModel', 'Ergo.data.Model', {
	



  initialize: function() {
  	this.$super.apply(this, arguments);
  	
    this._fetched = false;
  }
	
	
	
	
}, 'ajax-model');
