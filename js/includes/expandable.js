

Ergo.alias('includes:expandable', {

	defaults: {
		components: {
			sub: {
				hidden: true
			}
		},
		transitions: {
			'* > expanded': function() {
				this.$sub.show();
			},
			'expanded > *': function() {
				this.$sub.hide();
			}
		},
		events: {
			'expand': function(e) {
				this.states.toggle('expanded');
//				e.stop();
			}
		}
	}

});



Ergo.alias('includes:exclusive-expand', {

	defaults: {
		events: {
			'expand': function() {
				// схлапываем соседние узлы
	      this.parent.items.each(function(item) {
	        if(item != this && item.states.is('expanded'))
	          item.states.unset('expanded');
	      }.bind(this));
			}
		}
	}

});
