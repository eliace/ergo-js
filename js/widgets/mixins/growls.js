

Ergo.alias('includes:growls', {

  defaults: {
    growls: {
      etype: 'growls',
    	as: '+top +right',
    	renderTo: 'body',
    	defaultItem: {
    		$content: {
    			etype: 'alert',
    			width: 300,
    			as: 'box inverted minor',
    			$icon: {
    				as: 'fa circular'
    			}
    		}
    	},
    	timeout: 8000
    }
  },


  _construct: function(o) {

    var ctx = this;

    this._growls = $.ergo(o.growls);


    window.growl = {
    	'error': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-times',
          title: title || 'Ошибка!',
          text: msg,
          as: 'danger'
    		});
    	},
      'warning': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-bell-o',
          title: title || 'Внимание!',
          text: msg,
          as: 'warning'
    		});
    	},
      'info': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-info',
          title: title || 'Информация!',
          text: msg,
          as: 'info'
    		});
    	},
      'success': function(msg, title) {
    		ctx._growls.addGrowl({
          icon: 'fa-check',
          title: title || 'Готово!',
          text: msg,
          as: 'success'
    		});
    	}
    }


  }

});
