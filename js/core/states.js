
//= require events



/**
 * Менеджер состояний
 *
 *
 * @class
 * @name Ergo.core.StateManager
 */
Ergo.core.StateManager = function(target) {
	this._widget = target;
	this._current = {};
	this._states = {};
	this._transitions = [];
	this._exclusives = {};
	this._groups = {};
}

Ergo.merge(Ergo.core.StateManager.prototype, /** @lends Ergo.core.StateManager.prototype */{

//Ergo.defineClass('Ergo.core.StateManager', 'Ergo.core.Object', /** @lends Ergo.core.StateManager.prototype */{


	_initialize: function(widget) {
		this._widget = widget;
		this._current = {};
		this._states = {};
		this._transitions = [];
		this._exclusives = {};
		this._groups = {};
//		thi._substates = {};
	},


	transition: function(from, to, value) {

		var t = this._transitions;
//		var s = name.replace(/\s/g, '');
//		if(!t[from]) t[from] = {};
//		t[from][to] = value;
		t.push({
			from: from,
			to: to,
			action: value
		});

	},


	exclusive: function(name, g) {

//		var excl_template = new RegExp('^'+name+'.*$');
		var excl_template = new RegExp('^'+name+'$');

		var group = this._exclusives[g];
		if(!group) group = [];
		this._exclusives[g] = group;

		group.push(excl_template);
	},

	exclusive_group: function(g, exclusives) {
		for(var i = 0; i < exclusives.length; i++)
			this.exclusive(exclusives[i], g);
	},


	/**
	 * Добавление нового состояния
	 *
	 * @param {String} name наименование
	 * @param {String|Function} состояние
	 *
	 */
	state: function(name, value) {

		if(arguments.length == 1) {
			return this._current[name];
		}

		// добавляем эксклюзивные группы
		if(value && value.constructor === Object) {
			var group = this._groups[name] || {};
			for(var i in value) {
				this.state(i, value[i]);
				group[i] = true;
			}
			this._groups[name] = group;
			// var group = this._exclusives[name] || [];
			// for(var i in value) {
			// 	this.state(i, value[i]);
			// 	group.push(new RegExp('^'+i+'$'));
			// }
			// this._exclusives[name] = group;
		}
		else {

			//FIXME парсим код состояния
			var i = name.indexOf(':');
			if( i == 0 ) {
				var g = name.substr(1);
				this.exclusive_group(g, value);
			}
			else {
				if( i > 0 ) {
					var g = name.substr(i+1);
					name = name.substr(0, i);

					this.exclusive(name, g);
				}

				this._states[name] = value;
			}
		}
	},



	/**
	 * Установка состояния
	 *
	 * @param {String} to имя состояния
	 * @param {Object} data данные, связанные с состоянием
	 */
	set: function(to, data) {

		if(!to || (typeof to !== 'string')) {
			console.warn('State key ['+$ergo.print(to)+'] must be of type string');
			return false;
		}

		var to_a = to.split('.');

		var parent = null;
		var group = null;

		// устанавливаем базовые состояния, убираем
		if(to_a.length > 1) {

			to = to_a.pop();

			// восстанавливаем состояния
			for(var i = 0; i < to_a.length; i++) {
				var stt = to_a[i];
				if(!this._current[stt]) {

					var g = null;
					for(var i in this._groups) {
						if( this._groups[i][stt] ) {
							g = i;
							break;
						}
					}

					this._state_on(stt, data);
					this._current[stt] = {
						name: stt,
						from: null, //FIXME
						data: data,
						parent: parent,
						group: g
					}
				}
				parent = stt;
			}


		}

		// Если состояние уже установлено, то ничего не делаем
		if(to && (to in this._current))
			return false;//$.when({});




		var self = this;
		var transitions = this._transitions;
		var states = this._states;//this._widget.options.states;

		var from = [];

		// 1.
		var def = null;
		var deferreds = [];

		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.to == to && t.from in this._current) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
				deferreds.push(result);
//					deferred = deferred ? $.when(deferred, result) : $.when(result);

				from.push(t.from);
			}
			else if(t.to == to && t.from == '*'){
				def = t;
			}
		}
		// for(var i in this._current) {
			// if(i in transitions && to in transitions[i]) {
				// transitions[i][to].call(this._widget);
				// from.push(i);
			// }
		// }

/*
		for(var g in this._exclusives) {
			if( this._is_exclusive(to, g) ) {

				for(var i in this._current)
					if(this._is_exclusive(i, g)) {
						this._state_off(i, self._current[i]);
						delete self._current[i];
					}
//						this.unset(i);

			}
		}
*/


		// TODO ищем только первую группу, а нужно - все
		for(var i in this._groups) {
			if( this._groups[i][to] ) {
				group = i;
				break;
			}
		}

		// if(parent && !group) {
		// 	group = parent.
		// }

		// отключаем эксклюзивные состояния
		for(var i in this._current) {
			var stt = this._current[i];
			if( stt.group == group && (group || (parent != null && stt.parent == parent)) ) {
				this.unset(i);
				break;
			}
		}







		if(from.length == 0 && def) {
			var result = def.action.call(this._widget);

//			if(result && result.done)
			deferreds.push(result);
//				deferred = $.when(result);
		}





		// if(deferreds.length == 0)
			// deferreds.push({});



		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }


		var changeState = function() {
			// 2. удаляем все исходные состояния переходов из списка активных состояний
			for(var i = 0; i < from.length; i++) {
				delete self._current[from[i]];
			}

			// 3. включаем итоговое состояние
			self._state_on(to, data);
			self._current[to] = {
				name: to,
				from: from,
				data: data,
				parent: parent,
				group: group
			};

			// 4. оповещаем виджет, что состояние изменилось
//			self._widget.events.fire('stateChanged', {from: from, to: to, data: data});

			return true;
		}



		return (deferreds.length == 0) ? changeState.call(this) : $.when.apply($, deferreds).done(changeState);

//		return deferred;
	},



	_state_on: function(s, data) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if(typeof val == 'string') {
				// action
				var a = val.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this._widget[a[0]];
				if(action == null) {
					this._widget._missedAction(val, true, data);
				}
				else {
					action.call(this._widget, a[1], true);
				}
//				this._widget.dom.addClass(val);
			}
//				this._widget.el.classList.add(val);
			// если состояние определено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.dom.addClass(val);
				this._widget.dom.removeClass(val[1]);
				// this._widget.el.classList.add(val[0]);
				// this._widget.el.classList.remove(val[1]);

				// if(val.length > 0) {
				// 	$.when( val[0].call(this._widget, true, data) ).done(function(add_cls) {
				// 		if(add_cls !== false)
				// 			self._widget.el.addClass(add_cls || s);
				// 	});
				// }
			}
			else if(val.constructor == Object) {
				console.warn('State group ['+s+'] can not be used as state');
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				val.call(this._widget, true, data);
				// $.when( val.call(this._widget, true, data) ).done(function(add_cls) {
				// 	if(add_cls !== false)
				// 		self._widget.dom.addClass(add_cls || s);
				// });
			}
		}
		else {
			this._widget._missedState(s, true, data);
//			this._widget.dom.addClass(s);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'on', data: data});
	},





	_state_off: function(s, data) {

		var self = this;
		var states = this._states;//this._widget.options.states;

		if(s in states) {
			var val = states[s];

			// если состояние определено строкой, то строка содержит имя устанавливаемого класса
			if(typeof val == 'string') {
				// action
				var a = val.split(':');
				var action = $ergo.alias('actions:'+a[0]) || this._widget[a[0]];
				if(action == null) {
					this._widget._missedAction(val, false, data);
				}
				else {
					action.call(this._widget, a[1], false);
				}
//				this._widget.dom.removeClass(val);
			}

			// если состояние опрелено массивом, то первый элемент содержит состояние ON, а второй элемент состояние OFF
			else if( Array.isArray(val) ) {
				this._widget.dom.addClass(val[1]);
				this._widget.dom.removeClass(val[0]);

				// if(val.length > 1) {
				// 	$.when( val[1].call(this._widget, false) ).done(function(rm_cls) {
				// 		if(rm_cls !== false)
				// 			self._widget.el.removeClass(rm_cls || s);
				// 	});
				// }
			}
			// в иных случаях ожидается, что состояние содержит функцию
			else {
				val.call(this._widget, false, data);


				// $.when( val.call(this._widget, false) ).done(function(rm_cls) {
				// 	if(rm_cls !== false)
				// 		self._widget.dom.removeClass(rm_cls || s);
				// });

//				var rm_cls = val.call(this._widget, false);
//				if(rm_cls !== false)
//					this._widget.el.removeClass(s);
			}
		}
		else {
//			this._widget.dom.removeClass(s);
			this._widget._missedState(s, false, data);
		}

		this._widget.events.fire('stateChanged', {state: s, op: 'off'});

	},



	_is_exclusive: function(s, g) {

		var group = this._exclusives[g];

		for(var i = 0; i < group.length; i++) {
			if(s.match(group[i])) return true;
		}

		return false;
	},


	/**
	 * Отключение состояния
	 *
	 * @param {String} from имя состояния
	 */
	unset: function(from, data) {

		// Если состояние не установлено, то ничего не делаем
		if(from && !(from in this._current)) {
			return false;//$.when({});
		}



		var self = this;
		var transitions = this._transitions;
		var states = this._states; //this._widget.options.states;

		var to = [];

		// 1. Вызываем
		var def = null;
		var deferreds = [];

		for(var i = 0; i < transitions.length; i++) {
			var t = transitions[i];
			if(t.from == from && t.to) {
				var result = t.action.call(this._widget);
				// Если результат является Deferred-объектом, то сохраняем его в цепочку
//				if(result && result.done)
//					deferred = $.when(result);
				deferreds.push(result);

				to.push(t.to);
			}
			else if(t.from == from && t.to == '*') {
				def = t;
			}
		}
		// for(var i in transitions[from]) {
			// transitions[from][i].call(this._widget);
			// to.push(i);
		// }




// 		for(var g in this._exclusives) {
// 			if( this._is_exclusive(from, g) && this._exclusives[g].length == 2 ) {
//
// 				var group = this._exclusives[g];
//
// 				var regexp = from.match(group[0]) ? group[1] : group[0];
//
// 				for(var i in this._states)
// 					if( i.match(regexp) ) {
// 						this._state_on(i);
// 						self._current[i] = {
// 							from: from
// //							data: data
// 						}
// 					}
// 			}
// 		}





		if(to.length == 0 && def) {
			var result = def.action.call(this._widget);

			deferreds.push(result);
			// //FIXME
			// if(result && result.done)
				// deferred = $.when(result);

		}



		// 2.
		for(var i = 0; i < to.length; i++) {
			self._current[to[i]] = {from: [from]/*, data: data*/};
			if(to[i] in states) self._state_on(to[i]); //states[to[i]].call(self._widget);
		}


		$ergo.deepMerge(self._current[from], data);

		// 3.
		self._state_off(from, self._current[from]);

		delete self._current[from];


		// 3.
//		this.state_off(from);



		//FIXME хак, если Deferred не определен
		// if(deferred == null) {
			// deferred = $.Deferred();
			// deferred.resolve();
		// }



		// deferred.done(function() {
//
		// });



//		return deferred;
		return (deferreds.length == 0) ? true : $.when.apply($, deferreds);
	},



	/**
	 * Переключение состояния
	 *
	 * Состояние устанавливается, если флаг равен true и отключается, если флаг false
	 *
	 * @param {String} name имя состояния
	 * @param {boolean} sw флаг переключения
	 */
	toggle: function(name, sw) {

		if(arguments.length == 1 || typeof sw != 'boolean') sw = !this.is(name);

		return sw ? this.set(name) : this.unset(name);

//		return this;
	},



	/**
	 * Установка состояния и отключение других состояний, попадающих под шаблон
	 *
	 * @deprecated
	 *
	 * @param {String} name имя состояния
	 * @param {Array|String|RegExp} unset_template шаблон
	 */
	// only: function(name, unset_template) {
	//
	// 	var states_to_unset = [];
	//
	// 	if(unset_template) {
	//
	// 		if( $.isArray(unset_template) )
	// 			states_to_unset = unset_template;
	// 		else {
	// 			if($.isString(unset_template))
	// 				unset_template = new RegExp('^'+unset_template+'.*$');
	//
	// 			for(var i in this._current)
	// 				if(i.match(unset_template)) states_to_unset.push(i);
	// 		}
	// 	}
	// 	else {
	// 		for(var i in this._current)
	// 			if(i != name) states_to_unset.push(i);
	// 	}
	//
	// 	// очищаем состояния, выбранные для удаления
	// 	for(var i = 0; i < states_to_unset.length; i++)
	// 		this.unset(states_to_unset[i]);
	//
	// 	// если состояние еще не установлено, то устанавливаем его
	// 	if(!this.is(name))
	// 		this.set(name);
	//
	// 	return this;
	// },



	/**
	 * Очистка всех состояний
	 *
	 */
	clear: function() {
		this._current = {};
		return this;
	},


	/**
	 * Проверка, установлено ли состояние
	 *
	 * @param {String} name имя состояния
	 */
	is: function(name) {
		return (name in this._current);
	}



});





/**
 * Состояния
 *
 * @mixin statable
 */
Ergo.alias('mixins:statable', /** @lends statable */ {

	get states() {
		if( !this.__stt ) {
			this.__stt = new Ergo.core.StateManager(this);
		}
		return this.__stt;
	},



	// set stt(v) {
	// 	var self = this;
	// 	if(Array.isArray(v)) {
	// 		v = v.join(' ');
	// 	}
	// 	v.split(' ').forEach(function(s) {
	// 		self.states.set(s);
	// 	});
	// },


	/**
	 * Регистрация состояний, указанных в опции `states`
	 *
	 */
	_bindStates: function() {
		var o = this.options;

		if('states' in o){
			for(var i in o.states) {
				this.states.state(i, o.states[i]);
			}
			// // настраиваем особое поведение состояния hover ?
			// if('hover' in o.states) {
			// 	this.el.hover(function(){ self.states.set('hover'); }, function(){ self.states.unset('hover'); });
			// }
		}

		if('transitions' in o) {
			for(var i in o.transitions) {
				var t = o.transitions[i];
				if($.isPlainObject(t)) {
					//TODO
				}
				else {
					var a = i.split('>');
					if(a.length == 1) a.push('');
					this.states.transition(a[0].trim() || '*', a[1].trim() || '*', t);
				}
			}
		}

	},


	/**
	 * Обработчик "потерянного" состояния
	 *
	 * @param {String} name имя состояния
	 * @param {Boolean} on начение состояния
	 *
	 */
	_missedState: function(name, on) {
		console.warn('State ['+name+'] is undefined');
	},




	is: function(name) {
		return this.states.is(name);
	},

	set: function(name, data) {
		this.states.set(name, data);
	},

	unset: function(name, data) {
		this.states.unset(name, data);
	},

	toggle: function(name, on) {
		this.states.toggle(name, on);
	}


});
