


Ergo.declare('Ergo.data.LocalStoreCollection', 'Ergo.data.Collection', /** @lends Ergo.data.LocalStoreCollection.prototype */{
	
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
  fetch: function(ls_key) {
    
		var serialized_data = localStorage.getItem(ls_key);
		
		this.set( JSON.parse(serialized_data) );
		
  },
  
  
  
  /**
   * Синхронизация данных с хранилищем
   * 
   * 
   */
  flush: function(ls_key) {

		var serialized_data = JSON.stringify( this.get() );

//		try {
		localStorage.setItem(ls_key, serialized_data); 
//		}
//		catch (e) {
//			if (e == QUOTA_EXCEEDED_ERR) {
//				alert('Кончилось место'); //данные не сохранены, так как кончилось доступное место
//			}
//		}
  	
  }
  
  
});