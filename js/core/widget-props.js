


/**
 * @lends Ergo.core.Widget.prototype
 */
Ergo.WidgetProps = {

  props: {

    get: {
      text: function() {
    		if(this.$content) {
    			return this.$content.prop('text');
    		}
    		else {
    			return this.dom.innerEl.textContent;
    		}
    	}
    },

    set: {

      text: function(v) {
    		if(this.$content) {
    			this.$content.prop('text', v == null ? '': v);
    		}
    		else {
    			this.dom.innerEl.textContent = ( v == null ? '': v );
    		}

    		this.__txt = v;  //TODO пока это нужно только для оптимизации отрисовки
    	},

      innerHtml: function(v) {
        this.dom.innerEl.innerHTML = (v || '');
      },

      autoWidth: function(v) {
    		v ? this.dom.el.setAttribute('autoWidth', v) : this.dom.el.removeAttribute('autoWidth');
    	},

    	autoHeight: function(v) {
    		if(v) {
    			this.dom.el.setAttribute('autoHeight', v);
    			if(v === true || v == 'ignore-siblings')
    				this.dom.setStyle('overflow-y', 'auto');//.el.style['overflow-y'] = 'auto';//('overflow-y', 'auto');
    		}
    		else {
    			this.dom.el.removeAttribute('autoHeight');
    			this.dom.setStyle('overflow-y', '');
    //			this.el.css('overflow-y', '');
    //			this.el.style['overflow-y'] = '';
    		}
    	},


    	hidden: function(v) {
    		this.dom.outerEl.style.display = (v ? 'none' : '');//.css('display', v ? 'none' : '');
    //		this.el.css('display', v ? 'none' : '');
    	},



      // атрибуты

      id: function(v) {
    		this.dom.el.setAttribute('id', v);
    	},

    	tabindex: function(v) {
    		this.dom.el.setAttribute('tabindex', v);
    	},

    	tooltip: function(v) {
    		this.dom.el.setAttribute('title', v);
    	}



    }

  }

};
