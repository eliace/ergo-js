var smpl = sample('Параметры (опции)');


var obj = new Ergo.core.Object({
	
	color: 'Зеленый',
	
	title: 'Некоторый текст',
	
	set: {
		'color': function(v) {
			this._color = v;
		}
	},
	
	get: {
		'color': function() {
			return this._color;
		}
	}
	
});


smpl.alert( 'Цвет: ' + obj.opt('color') );
smpl.alert( 'Заголовок: ' + obj.opt('title') );
smpl.alert( obj.options.title + ' + ' + obj.options.color );
