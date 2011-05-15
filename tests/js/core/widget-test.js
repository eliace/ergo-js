

test('core/widget', function(){
	
	var w = new Dino.core.Widget({
		html: '<div%a>%c</div>',
		text: 'Text'
	});
	
	equals(w.$print(), '<div id="id-1">Text</div>', 'Содержимое виджета, определяется через text');
	
	
	var Anchor = Dino.core.Widget.extend({
		
		html: '<a%a>%c</a>',

		$print_attrs: function(attrs) {
			Anchor.superclass.$print_attrs.apply(this, arguments);
			
			var o = this.options;
			
			if('src' in o) attrs.src = o.src;
		}	
	});
	
	w = new Anchor({
		src: 'http://www.google.ru'
	})
	
	equals(w.$print(), '<a id="id-2" src="http://www.google.ru"></a>', 'Отрисовка виджета');
	
	
	
});