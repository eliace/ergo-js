


Dino.declare('Dino.Layout', Dino.BaseObject, {
	
	defaultOptions: {
		updateMode: 'auto'	
	},
	
	initialize: function(o){
		Dino.Layout.superclass.initialize.call(this);
		
		this.options = Dino.utils.overrideOpts({}, this.defaultOptions, o);
		
//		this.attach(this.options.container);
		
	},
	
	// ассоциация компоновки с контейнером
	attach: function(c) { 
		
		var o = this.options;
		
		this.container = c;
				
		if('name' in o) this.container.el.attr('layout', o.name);

		this.el = this.container.el;
		
		if(o.html){
			var html = $(o.html);
			this.el = (o.htmlSelector) ? $(o.htmlSelector, html) : html;
			this.container.el.append(html);
		}
		
	},
	// удаление ассоциации компоновки с контейнером
	detach: function() { 
//		if('containerCls' in this.options) this.container.el.removeClass(this.options.containerCls);
		if('name' in this.options) this.container.el.attr('layout', undefined);
		delete this.container; 
	},
	
//	add: function(item) {},
	// добавление нового элемента-виджета в компоновку
	insert: function(item, i) {},
	// удаление элемента-виджета из компоновки
	remove: function(item) {},
	// обновление компоновки (позиции, размеров элементов)
	update: function() {},
	// обновление компоновки (порядка, количества элементов)
	rebuild: function() {},
	// очистка компоновки от всех элементов (уничтожения дочерних элементов не происходит)
	clear: function() {}
//	batch: function(callback) {}
});



