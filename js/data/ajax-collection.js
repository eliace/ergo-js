
//= require "collection"


Ergo.data.AjaxCollection = Ergo.declare('Ergo.data.AjaxCollection', 'Ergo.data.Collection', {
	
	
  initialize: function() {
  	this.$super.apply(this, arguments);
//    Ergo.data.AjaxCollection.superclass.initialize.apply(this, arguments);
    
//    this._from = 0;
//    this._to = 0;
    this._fetched = false;
  },
  
  fetch: function(params) {
    
    var self = this;
    
    return $.getJSON(this.options.path, Ergo.override({_: Ergo.timestamp()}, params))
    	.always(function(){
    		self._fetched = true;
    	})
    	.success(function(json){
    		self.set(json);
    	});
  }
  
/*  
  range: function(from, to) {
    this._from = from;
    this._to = to;
    return this;
  }
*/  
  
  
  
});