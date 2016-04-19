
//= require dom


Ergo.core.DOM = function() {
	var a = new Array(arguments.length);
	for(var i = 0; i < arguments.length; i++)
		a[i] = arguments[i];

	this._initialize.apply(this, arguments);

}



Ergo.merge(Ergo.core.VDOM.prototype, {


	_initialize: function(tag, widget, options, ns) {

    var dom = this;

    this._widget = widget;
    this.options = options || {};


//    var o = this._widget.options;

    // рендерим DOM-элемент
    if( tag ) {
			if(tag.constructor == String) {
				this.el = ns ? document.createElementNS(ns, tag) : document.createElement(tag)
			}
			else {
				this.el = tag;
			}
    }
    else {
      this.el = document.createTextNode('');
    }


    // здесь нужно добавить стили и классы




    // обработчик событий
    this.events = {

      listeners: {},

      on: function(name, callback) {
        this.listeners[name] = callback.bind(dom._widget);
        dom.el.addEventListener(name, this.listeners[name]);
        // widget.events.on('dom#'+name, callback);
        // if(!this.listeners[name]) {
        //   this.listeners[name] = function(e) { this.events.fire('dom#'+name, {}, e); }.bind(widget);
        //   dom.el.addEventListener(name, this.listeners[name]);
        // }
      },

      off: function(name) {
				if(arguments.length == 0) {
					for(var i in this.listeners) {
						dom.el.removeEventListener(i, this.listeners[i]);
					}
					this.listeners = {};
				}
				else {
	        dom.el.removeEventListener(name, this.listeners[name]);
	        delete this.listeners[name];
				}
        // _widget.events.off('dom#'+name);
        // for(var i in this._listeners) {
        //   dom.el.removeEventListener(name);
        // }
      }

    }


    //FIXME идеологически это неправильно
    this.el._dom = this;

	},



	_destroy: function() {

		// осоединяемся от DOM
		this.detach();

		// удаляем все обработчики событий
		this.events.off();

	},




	setStyle: function(k, v) {
		if(arguments.length == 2) {
			v = (typeof v === 'number') ? $ergo.dom.numberStyleToPx(k, v) : v;
			this.el.style[k] = v;
		}
		else if(arguments.length == 1 && k) {
			if( k.constructor === Object ) {
				for(var i in k) {
					var v = k[i];
					v = (typeof v === 'number') ? $ergo.dom.numberStyleToPx(i, v) : v;
					this.el.style[i] = v;
				}
			}
			else if( k.constructor === String ) {
				return this.el.style[k];
			}
		}
	},



	setClass: function(cls) {
		if( cls && this.el instanceof Element ) {
			this.el.className = cls;//.join(' ');
		}
	},

	addClass: function(cls) {
		if( cls && this.el instanceof Element ) {
      var dom = this;
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(dom.el.classList) {
					dom.el.classList.add(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					if(!re.test(dom.el.className)) {
						dom.el.className = (dom.el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
					}
				}
			});
		}
	},

	removeClass: function(cls) {
		if( cls && this.el instanceof Element ) {
      var dom = this;
			(''+cls).split(' ').forEach(function(c) {

				if(!c) return;

				if(dom.el.classList) {
					dom.el.classList.remove(c);
				}
				else {
					// IE9
					var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
					dom.el.className = dom.el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
				}
			});
		}
	},

	detach: function() {
		if(this.el.parentNode) {
			this.el.parentNode.removeChild(this.el);
		}
	},


	each: function(callback) {
		Array.prototype.forEach.call(this.el.childNodes, callback);
	}



});
