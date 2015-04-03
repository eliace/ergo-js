
/**
 * Контекст
 *
 * @class
 * @name Ergo.core.Context
 * @extends Ergo.core.Object
 * 
 */
Ergo.defineClass('Ergo.core.Context', 'Ergo.core.Object', /** @lends Ergo.core.Context.prototype */{
	
	defaults: {
		plugins: [Ergo.Observable] //, Ergo.Statable]
	},
	
	
	
	
	
	_construct: function(o) {
		this._super(o);
		
		
		
		
		if(o.hashLinks) {
			
			// обрабатываем нажатие ссылок
			$('html').click(function(e){
				var el = $(e.target);
		//		console.log(el[0].localName);
		//		console.log(el.attr('href'));
				if(el[0] && el[0].localName == 'a' && el.attr('href') == '#') {
					e.preventDefault();
					
					// !
					// var w = el.ergo();
					// if(w && w.opt('link')) {
		// //				$context.setState( w.opt('link'), 'pages', {}, true );
					// }
				}
			});
			
			
		}
		
		
		if(o.history) {
			
			// для полифила
			var location = window.history.location || window.location;
			
			
		}
		
		
		
		
		if(o.windowBox) {
			
			// обновляем компоновку при изменении размеров окна
			$(window).on('resize', function(){
				
				//устанавливаем высоту <body> по высоте окна
				$('body').height(window.innerHeight);
				// обновляем компоновку
				$context.app._layoutChanged();
				
			});
			
			
			$('body').height(window.innerHeight);		
		}
		
		
	},
	
	
	/*
	state: function(s, fn) {
		this.states.state(s, function() {
			fn.apply(this, arguments);
			return false;
		}.bind(this));
	},
	*/
	
		
	scope: function() {

	},



	
	
	
	open_glass_pane: function() {
		var gp = $('<div class="glass-pane" autoheight="ignore"/>')
			.on('mousedown', function(e){
				e.preventDefault();
				return false;				
			});		
			
		$('body').append(gp);	
			
		return gp;
	},
	
	
	close_glass_pane: function() {
		$('.glass-pane').remove();
	}
	
	
});




Ergo.defineClass('Ergo.core.Scope', 'Ergo.core.Object', {


	_construct: function(o) {
		this._super(o);

		this.widgets = {};


		this.context = null;
	},




	// получение/создание виджета из пространства контекста
	widget: function(key, w) {

		if(arguments.length == 1) {
			return this.widgets[key];
		}
		else if(arguments.length == 2) {
			this.widgets[key] = w;
		}


	}


});








Ergo.context = new Ergo.core.Context();
