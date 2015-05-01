
/**
 * Контекст
 *
 * Сериализуемое состояние приложения
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
		
		
		this._scopes = {};
		this._callbacks = {};
		this._data = {};
		this._params = {};
		
		
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
			
			var self = this;

			// $(window).on('popstate', function(e) {
			// 	var p = e.originalEvent.state;
			// 	if(p) {
			// 		self._no_history = true;
			// 		self.events.fire('restore', {scope: p._scope, params: p});
			// 		self._no_history = false;
			// 	}
			// });

			
			// this.events.reg('scope:joined', function(e) {

			// 	if(e.scope.history && !self._no_history) {
			// 		window.history.pushState( Ergo.override({_scope: e.scope._name}, self._params), e.scope._name );//, 'title', '#'+url);
			// 	}

			// });

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
	},



	// получение виджета из контекста (обход всех скоупов)
	widget: function(key) {

		var name_a = key.split('.');

		if(name_a.length == 2) {
			return this._scopes[name_a[0]].widget(name_a[1]);
		}

		// for(var i in this._scopes) {
		// 	var w = this._scopes[i].widgets[key];
		// 	if(w) return w;
		// }

	},


	// получение данных из контекста
	data: function(key, v) {

		if(arguments.length == 1)
			return this._data[key];
		else
			this._data[key] = v;

		// for(var i in this._scopes) {
		// 	var d = this._scopes[i].data[key];
		// 	if(d) return d;
		// }

	},


	param: function(key, v) {
		if(arguments.length == 1)
			return this._params[key];
		else
			this._params[key] = v;		
	},


	// регистрация скоупа
	scope: function(name, callback) {

		this._callbacks[name] = callback;

	},


	// подсоединяем скоуп к контексту
	join: function(scope_name) {


		if(!this._callbacks[scope_name])
			throw 'Scope ['+scope_name+'] is not registered in context';


		var name_a = scope_name.split(':');
		var group = (name_a.length == 1) ? null : name_a[0];

		// если присутствует скоуп с такой же группой, то закрываем его
		for(var i in this._scopes) {
			if(i.indexOf(group+':') != -1) {
				this.events.fire('scope:disjoin', {scope: this._scopes[i]});
				this.disjoin(i);
			}
		}



		// создаем скоуп
		var scope = new Ergo.core.Scope();
		scope._context = this;
		scope._name = scope_name;

		this._scopes[scope_name] = scope;

		// инициализируем скоуп
		this._callbacks[scope_name].call(this, scope);

		// загружаем данные скоупа?

		// рендерим виджеты скоупа (включаем виджеты в скоуп)
		for(var i in scope.widgets) {
			
			var w = scope.widgets[i];
			
			if(!w._rendered)
				w.render('body');
		}


		this.events.fire('scope:joined', {scope: scope});

	},


	// отсоединяем скоуп от контекста
	disjoin: function(scope_name) {

		var scope = this._scopes[scope_name];

		// удаляем виджеты скоупа (отсоединяем виджеты от скоупа)
		for(var i in scope.widgets) {
			
			var w = scope.widgets[i];

			w._destroy();
			
		}

		delete this._scopes[scope_name];

		// выгружаем данные?

	},


	// сменить контекст
	to: function(scope_name, params, data) {

		// удалить текущий субконтекст?


		// создаем новый контекст
		var ctx = new Ergo.core.Context();
		ctx.params = params;
		ctx._data = data;
//		ctx._scope = this;

		ctx.join(scope_name);

		this._subcontext = ctx;

	},



	reset: function() {

		for(var i in this._scopes) {
			this.events.fire('scope:disjoin', {scope: this._scopes[i]});
			this.disjoin(i);
		}
		
	}

	
});



/**
* Скоуп
*
*	Структурный элемент страницы, включающий набор виджетов
*
*
*/

Ergo.defineClass('Ergo.core.Scope', 'Ergo.core.Object', {


	_construct: function(o) {
		this._super(o);

		this.widgets = {};
//		this.data = {};

//		this.context = null;
	},




	// получение/создание виджета из пространства контекста
	widget: function(key, w) {

		if(arguments.length == 1) {
			return this.widgets[key];
		}
		else if(arguments.length == 2) {

			if($.isPlainObject(w)) {
				w = $.ergo(w, null, this._context);
//				w.bind();
			}

			this.widgets[key] = w;

			return w;
		}

	},


	disjoin: function() {
		this._context.disjoin(this._name);
	}



});








Ergo.context = new Ergo.core.Context();
