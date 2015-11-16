
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
//		plugins: [Ergo.Observable] //, Ergo.Statable]
		include: 'observable',

		events: {
			'restore': function(e) {
				//TODO здесь нужно указывать парметры по умолчанию
			}
		}

	},





	_construct: function(o) {
		this._super(o);


		this._scopes = {};
		this._callbacks = {};
		this._depends = {};
		this._data = {};
		this._params = {};


		// if('events' in o) {
		// 	for(var i in o.events) {
		// 		var callback_a = o.events[i];
		// 		for(var j = 0; j < callback_a.length; j++) {
		// 			var callback = callback_a[j];
		// 			if( $.isFunction(callback) ) {
		// 				this.events.on(i, callback, this);
		// 			}
		// 		}
		// 	}
		// }





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


//		if(o.history) {






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

//		}




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

		var name_a = key.split('@');

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




	// param: function(key, v) {
	// 	if(arguments.length == 1)
	// 		return this._params[key];
	// 	else
	// 		this._params[key] = v;
	// },


	// регистрация скоупа
	scope: function(name, callback) {

		if(arguments.length == 1) {
			if(name[0] == ':') {
				for(var i in this._scopes) {
					if(i.indexOf(name) > 0)
						return this._scopes[i];
				}
			}
			else {
				return this._scopes[name];
			}
		}
		else if(arguments.length == 2) {
			this._callbacks[name] = callback;
		}
		else {
			this._callbacks[name] = arguments[2];
			this._depends[name] = Array.isArray(arguments[1]) ? arguments[1] : [arguments[1]] ;
		}

	},


	// подсоединяем скоуп к контексту
	join: function(scope_name, params, o) {

		var ctx = this;

		var parent = null;

		var chain = scope_name.split('.');

		console.log('scope chain', chain);

		if( chain.length > 1 ) {
			// инициализируем базовые скоупы
			parent = this._scopes[chain[chain.length-2]] || this.join( chain.splice(0,chain.length-1).join('.'), params, Ergo.override({restored: true}, o) );
		}

		scope_name = chain[chain.length-1];


		if(!this._callbacks[scope_name])
			throw 'Scope ['+scope_name+'] is not registered in context';




		if( parent ) {
			// отсоединяем вложенные скоупы
			// FIXME считается, что они эксклюзивны по отношению к текущему
			for( var i in parent._children )
				this.disjoin( parent._children[i] );
		}

		// var name_a = scope_name.split(':');
		// var group = (name_a.length == 1) ? null : name_a[name_a.length-1];
		//
		// // если присутствует скоуп с такой же группой, то отсоединяем его
		// for(var i in this._scopes) {
		// 	if(i.indexOf(':'+group) != -1) {
		// 		this.events.fire('scope:disjoin', {scope: this._scopes[i]});
		// 		this.disjoin(i);
		// 	}
		// }


		// // если отсутствует базовый скоуп, то сначала присоединяем его
		// if( this._depends[scope_name] ) {
		// 	var base_scopes = this._depends[scope_name];
		//
		// 	var base_scope = null;
		// 	for(var i = 0; i < base_scopes.length; i++) {
		// 		base_scope = this._scopes[base_scopes[i]];
		// 		if(base_scope)
		// 			break;
		// 	}
		//
		// 	if( !base_scope ) {
		// 		ctx.join(base_scopes[0]);
		// 		base_scope = this._scopes[base_scopes[0]]
		// 	}
		//
		// 	parent = base_scope;
		//
		// }


//		this._params[scope_name] = this._params[scope_name] || {};

		// создаем скоуп
		var scope = new Ergo.core.Scope(o);
		scope._context = this;
		scope._name = scope_name;
		scope._parent = parent;
		scope._params = params || {};// Ergo.override(this._params[scope_name], params);// this._params[scope_name];
//		scope._container = container;

//		Ergo.override(scope, overrides);

		scope._chain = parent ? parent._chain.concat(scope_name) : [scope_name];



		if(parent)
			parent._children[scope_name] = scope;

		this._scopes[scope_name] = scope;


		var deferred = $.Deferred();

		scope._promise = deferred.promise();

		var _scope = Ergo._scope;

		Ergo._scope = scope;


//		ctx.events.fire('scope:prejoin', {scope: scope, params: scope._params});
		ctx.events.fire('scope:join', {scope: scope, params: scope._params});
		scope.events.fire('join');
		

		// инициализируем скоуп
		var initPromise = this._callbacks[scope_name].call(this, scope, Ergo.override({}, scope._params), scope._promise) || true;

		Ergo._scope = _scope;

		// загружаем данные скоупа?


		$.when(initPromise).done(function() {

			// рендерим виджеты скоупа (включаем виджеты в скоуп)
			for(var i in scope.widgets) {

				var w = scope.widgets[i];

				if(!w.parent && !w._rendered) {
					// если у родителя определен контейнер, используем его
					if(parent && parent._container) {
						parent._container.components.set(i, w);
						w.render();
					}
					// инче рендерим виджет в <body>
					else
						w.render('body');
				}
			}


			ctx.events.fire('scope:joined', {scope: scope, params: scope._params});
			scope.events.fire('joined');

			console.log('join:'+scope_name);

			deferred.resolve(scope, scope._params);
		});

		return scope;//._promise;
	},


	// отсоединяем скоуп от контекста
	disjoin: function(scope) {

		if( $.isString(scope) )
			scope = this._scopes[scope];


		scope.events.fire('disjoin', {scope: scope});
		this.events.fire('scope:disjoin', {scope: scope, params: scope._params});


		// отсоединяем вложенные скоупы
		for(var i in scope._children) {
			this.disjoin( scope._children[i] );
		}


		// удаляем виджеты скоупа (отсоединяем виджеты от скоупа)
		for(var i in scope.widgets) {

			var w = scope.widgets[i];

			console.log('destroy', i);


			w._destroy();

		}


		delete this._scopes[scope._name];

		console.log('disjoin', scope._name);

		if(scope._parent)
			delete scope._parent._children[scope._name];

		scope.events.fire('disjoined');


		// выгружаем данные?

	},


// 	// сменить контекст
// 	to: function(scope_name, params, data) {
//
// 		// удалить текущий субконтекст?
//
//
// 		// создаем новый контекст
// 		var ctx = new Ergo.core.Context();
// 		ctx.params = params;
// 		ctx._data = data;
// //		ctx._scope = this;
//
// 		ctx.join(scope_name);
//
// 		this._subcontext = ctx;
//
// 	},



	reset: function() {

		for(var i in this._scopes) {
//			this.events.fire('scope:disjoin', {scope: this._scopes[i]});
			this.disjoin(i);
		}

	},


	init: function() {

		var e = this.events.fire('restore', {name: null, params: {}, opts: {}});


		this.join( e.name, e.params, e.options );

//		var ctx = this;

/*
		var p = window.history.state;

		this._no_history = true;

		this.events.fire('scope:restore', {params: (p ? p : ctx.options.main)});

	// 	if(p) {

	// 		// восстанавливаем
	// 		this.restore(p);
	// 	}
	// 	else {
	// 		// устанавливаем по умолчанию
	// //		$context.join( $context.options.main );
	// 		this.restore( $context.options.main )
	// 	}

		this._no_history = false;
*/
	}


	// restore: function(name, p) {
	//
	// 	$context.join(name, p);
	//
	// // 	// обходим параметры
	// // 	for(var i in p) {
	// // 		for(var j in this._callbacks) {
	// // 			var s = ''+i+':'+p[i];
	// // 			if(i == j || s == j) {
	// // //				console.log('restore', i);
	// // 				$context.join(j);
	// // 			}
	// // 		}
	// // 	}
	//
	// }


});







Ergo.context = new Ergo.core.Context();

$context = Ergo.context;
