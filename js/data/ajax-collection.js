
//= require "collection"




/**
 * JSON-коллекция, загружаемая через AJAX
 * 
 * @example
 * 
 * Параметры:
 * 	{String} path - путь запроса (напр. "ajax/users", "user/posts/today")
 * 	{Object} queryParams - набор параметров запроса (напр. {from: 0, to: 50})
 * 
 * 
 * @class
 * @name Ergo.data.AjaxCollection
 * @extends Ergo.data.Collection
 */
Ergo.data.AjaxCollection = Ergo.declare('Ergo.data.AjaxCollection', 'Ergo.data.Collection', /** @lends Ergo.data.AjaxCollection.prototype */{
	
	
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
  fetch: function() {
    
    var self = this;
    
    return $.getJSON(this.options.path, Ergo.override({_: Ergo.timestamp()}, this.options.queryParams))
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