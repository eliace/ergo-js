
//= require "object"


Ergo.declare('Ergo.data.AjaxModel', 'Ergo.data.Object', {
	



  initialize: function() {
  	this.$super.apply(this, arguments);
  	
    this._fetched = false;
  },
  
  
  
  /**
   * Загрузка данных
   * 
   * @return {Deferred}
   */
  fetch: function(path, query, callback) {
    
    var self = this;
    
    var qPath = this.options.path;
    var qParams = Ergo.override({}, this.options.query);
    var qCallback = this.options.parse;
    
    for(var i = 0; i < arguments.length; i++) {
    	var arg = arguments[i];
    	if($.isString(arg)) qPath = arg;
    	else if($.isFunction(arg)) qCallback = arg;
    	else if($.isPlainObject(arg)) qParams = arg;
    }
    
    
    if(!this.options.cache) qParams._ = Ergo.timestamp();
    
    
//    qPath = qPath + '/' + id;
    
    this.events.fire('beforeFetch', {path: qPath, query: qParams});
    
    return $.getJSON(qPath, qParams)
    	.always(function(){
    		self._fetched = true;
    		self.events.fire('afterFetch');
    	})
    	.success(function(json){
    		if(qCallback)
    			json = qCallback.call(self, json);
   			self.set(json);
    	});
  }
	
	
	
	
}, 'ajax-model');
