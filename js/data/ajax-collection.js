
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
		cache: true
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
  fetch: function(path, query) {
    
    var self = this;
    
    var qPath = this.options.path;
    var qParams = Ergo.override({}, this.options.query);
    
    if(arguments.length == 2) {
    	qPath = path;
    	qParams = query;
    }
    else if(arguments.length == 1) {
    	if($.isPlainObject(path))
    		Ergo.override(qParams, path);
    	else
    		qPath = path;
    }
    
    if(!this.options.cache) qParams._ = Ergo.timestamp();
    
    return $.getJSON(qPath, qParams)
    	.always(function(){
    		self._fetched = true;
    	})
    	.success(function(json){
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