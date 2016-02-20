


/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetProps = {

  props: {

    get: {
      text: function() {
    		if(this.$content) {
    			return this.$content.opt('text');
    		}
    		else {
    			return this.vdom.innerEl.textContent;
    		}
    	}
    },

    set: {

      text: function(v) {
    		if(this.$content) {
    			this.$content.opt('text', v == null ? '': v);
    		}
    		else {
    			this.vdom.innerEl.textContent = ( v == null ? '': v );
    		}

    		this.__txt = v;  //TODO пока это нужно только для оптимизации отрисовки
    	},

      innerHtml: function(v) {
        this.vdom.innerEl.innerHTML = (v || '');
      },

      autoWidth: function(v) {
    		v ? this.vdom.el.setAttribute('autoWidth', v) : this.vdom.el.removeAttribute('autoWidth');
    	},

    	autoHeight: function(v) {
    		if(v) {
    			this.vdom.el.setAttribute('autoHeight', v);
    			if(v === true || v == 'ignore-siblings')
    				this.vdom.setStyle('overflow-y', 'auto');//.el.style['overflow-y'] = 'auto';//('overflow-y', 'auto');
    		}
    		else {
    			this.vdom.el.removeAttribute('autoHeight');
    			this.vdom.setStyle('overflow-y', '');
    //			this.el.css('overflow-y', '');
    //			this.el.style['overflow-y'] = '';
    		}
    	},


    	hidden: function(v) {
    		this.vdom.outerEl.style.display = (v ? 'none' : '');//.css('display', v ? 'none' : '');
    //		this.el.css('display', v ? 'none' : '');
    	},



      // атрибуты

      id: function(v) {
    		this.vdom.el.setAttribute('id', v);
    	},

    	tabindex: function(v) {
    		this.vdom.el.setAttribute('tabindex', v);
    	},

    	tooltip: function(v) {
    		this.vdom.el.setAttribute('title', v);
    	}



    }

  }

};
