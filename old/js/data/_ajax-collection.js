
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
		url: '',
		query: {},
		ajax: {
			cache: true,
			dataType: 'json'		
		}
	},
	
	
  initialize: function(o) {
		this.$super([], o);

    this._fetched = false;
  },
  
  
  /**
   * Загрузка данных
   * 
   * @return {Deferred}
   */
  fetch: function(url, query, callback) {
    
    var self = this;
    
    var qUrl = this.options.url || this.url;
    var qParams = Ergo.override({}, this.options.query);
    var qCallback = this.options.parse || this.parse;
    
    for(var i = 0; i < arguments.length; i++) {
    	var arg = arguments[i];
    	if($.isString(arg)) qUrl = arg;
    	else if($.isFunction(arg)) qCallback = arg;
    	else if($.isPlainObject(arg)) qParams = arg;
    }
    
    
		var o = Ergo.override({
			type: 'GET',
			data: qParams
		}, this.options.ajax);
		
		var self = this;


    this.events.fire('beforeFetch', {url: qUrl, query: qParams});
		
		return $.ajax(qUrl, o)
    	.always(function(){
    		self._fetched = true;
    		self.events.fire('afterFetch');
    	})
			.success(function(data){
   			self.set( qCallback.call(self, data, 'fetch') );
			});
        
    
  },
  
  
  
  parse: function(data, op) {
  	return data;
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