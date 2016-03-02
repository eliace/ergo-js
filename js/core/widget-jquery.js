

Ergo.alias('mixins:jquery', {

  get el() {
    return $(this.dom.el);
  },


  get jquery() {
    if(!this.__jq) {
      var self = this;

      this.__jq = {
        events: {
          on: function(name, callback) {
            self.el.on(name, callback.bind(self));
          }
        },

        get el() {
          return self.el;
        }
      }

      this._bindEvents('jquery');
    }

    return this.__jq;
  },


  set width(v) { this.el.outerWidth(v); },
	set height(v) { this.el.outerHeight(v); },

  get width() {	return this.el.outerWidth();	},
	get height() { return this.el.outerHeight();	},


  // $render: function(target) {
  //   return target ? this.render($(target)[0]) : this.render();
  // },

  /**
	 * Отображение виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	show: function(wrapperAware) {
		return $.when( (wrapperAware !== false) ? $(this.dom.outerEl).show() : this.el.show() );
	},


	/**
	 * Скрытие виджета
	 *
	 * В том случае, если он уже включен в DOM-дерево
	 */
	hide: function(wrapperAware) {
		return $.when( (wrapperAware !== false) ? $(this.dom.outerEl).hide() : this.el.hide() );
	}






});
