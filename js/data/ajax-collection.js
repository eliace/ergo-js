
//= require "collection"




/**
 * JSON-коллекция, загружаемая через AJAX
 * 
 * @example
 * 
 * Параметры:
 * 	{String} path - путь запроса (напр. "ajax/users", "user/posts/today")
 * 	{Object} query - набор параметров запроса (напр. {from: 0, to: 50})
 * 
 * 
 * @class
 * @name Ergo.data.AjaxCollection
 * @extends Ergo.data.Collection
 */
Ergo.declare('Ergo.data.AjaxCollection', 'Ergo.data.Collection', /** @lends Ergo.data.AjaxCollection.prototype */{
	
	defaults: {
		cache: true,
		path: '',
		query: {},
		parse: null
//		process: function(json) {
//		}
	},
	
	
  initialize: function() {
  	this.$super.apply(this, arguments);
//    Ergo.data.AjaxCollection.superclass.initialize.apply(this, arguments);
    
//    this._from = 0;
//    this._to = 0;
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
  },
  
    
  /**
   * Синхронизация данных с хранилищем
   * 
   * 
   */
  flush: function() {
  	
  }
  
/*  
  range: function(from, to) {
    this._from = from;
    this._to = to;
    return this;
  }
*/  
  
  
  
});