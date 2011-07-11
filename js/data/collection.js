
//= require <core/data-source>


Dino.declare('Dino.data.Collection', 'Dino.core.DataSource', {
	
	defaults: {
		itemModel: null
	},
	
	
	getByOID: function(oid) {
		var a = this._val();
		for(var i in a)
			if(a[i].id == oid) return a[i];
		return null;
	},
	
	
	factory: function(i) {
		
		/**
		 * Фабрика должна создавать элементы с помощью функции-генератора класса.
		 * Причем, могут быть такие случаи:
		 *  - задана сама функция
		 *  - задано имя класса
		 *  - задано поле, которое содержит имя класса
		 */
		
		var model = this.options.itemModel; //(this.options.itemModel) ? this.options.itemModel : Dino.core.DataSource;
//		if(Dino.isFunction(model)) model = model.call(this, this._val()[i]);
		if(Dino.isString(model)) model = eval(model); //TODO здесь лучше загружать класс по зарегистрированному имени
		model = model || Dino.core.DataSource;
		return new model(this, i); 
	}

	
	
});
