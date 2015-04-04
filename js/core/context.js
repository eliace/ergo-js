
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

		for(var i in this._scopes) {
			var w = this._scopes[i].widgets[key];
			if(w) return w;
		}

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
				this.disjoin(i);
			}
		}



		// создаем скоуп
		var scope = new Ergo.core.Scope();
		scope._context = this;

		this._scopes[scope_name] = scope;

		// инициализируем скоуп
		this._callbacks[scope_name].call(scope, this, scope);

		// загружаем данные скоупа?

		// рендерим виджеты скоупа (включаем виджеты в скоуп)
		for(var i in scope.widgets) {
			
			var w = scope.widgets[i];
			
			if(!w._rendered)
				w.render('body');
		}


	},


	// отсоединяем скоуп от контекста
	disjoin: function(scope_name) {

		var scope = this._scopes[scope_name];

		// удаляем виджеты скоупа (отсоединяем виджеты от скоупа)
		for(var i in scope.widgets) {
			
			var w = scope.widgets[i];

			w._destroy();
			
		}

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

	}



});








Ergo.context = new Ergo.core.Context();
