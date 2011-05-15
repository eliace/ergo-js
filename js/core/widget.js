
//= require "layout"
//= require "collection"


Dino.id_counter = 1;


Dino.declare('Dino.core.Widget', 'Dino.core.Object', {
	
	html: '<div%a>%c</div>',
	
	initialize: function(){
		Dino.core.Widget.superclass.initialize.apply(this, arguments);
		
		var o = this.options;	
	
		this.id = 'id-'+(Dino.id_counter++);
		
		this.$init();
		
		this.layout = new Dino.core.Layout();
		
		this.components = new Dino.core.Array();

		if('components' in o) {
			for(var i in o.components)
				this.addComponent(o.components[i]);
		}
		
	},
	
	
	/**
	 * Модификация параметров виджета.
	 */
	$init: function(o) {
		
	},
	
	$render: function(target) {
		
		
		this.el = $(this.$print());
		$(target).append(el);
		
		this.$build();
	},
	
	$build: function() {
		
		var o = this.options;
		
		if('events' in o){
			for(var i in o.events){
				var callback = o.events[i];
				el.bind(i, callback.rcurry(self));
			}
		}
		
		
		if('states' in o){
			// настраиваем особое поведение состояния hover
			if('hover' in o.states){
				this.el.hover(function(){ self.states.set('hover') }, function(){ self.states.clear('hover') });
			}
		}
		
		
	},
	
	
	$print: function() {
		
		var o = this.options;
		
		var html = o.html || this.html;		
		
		var a = '';
		var attrs = {};
		this.$print_attrs(attrs);
		Dino.each(attrs, function(v, k){ if(v) a += ' '+k+'="'+v+'"'; });
		
		return html.replace(/%a/g, a).replace(/%c/g, this.$print_content());
	},
	
	$print_content: function() {

		var o = this.options;
		
		if('text' in o) return o.text;
		
		return this.layout.print();
	},
	
	$print_attrs: function(a) {
		
		var o = this.options;
		
		var css = {};
		var cls = [];

		a.id = this.id;
		
		if('cls'in o) cls.push(o.cls);
		if('style' in o) Dino.merge(css, o.css); 
		if('width' in o) css.width = width;
		if('height' in o) css.height = height;
		if('id' in o) a.id = o.id;
		
		a['class'] = cls.join(' ');
		a.style = '';
		Dino.each(css, function(k, v){ a.style += ''+k+':'+v; });
		
	},
	
	
	
	
	addComponent: function(c) {
		c = Dino.object(c);
		this[i] = c;
		this.components.add(c);
		this.layout.add(c);
		return c;
	}
	
});
