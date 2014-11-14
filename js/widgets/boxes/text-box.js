

Ergo.defineClass('Ergo.widgets.TextBox', 'Ergo.widgets.Box', {
	
	defaults: {
		baseCls: 'text-box',
		components: {
			content: {
				etype: 'html:input',
				events: {
					'jquery:keyup': function() {
						this.events.rise('changeText', {text: this.el.val()});
					},
					'jquery:focus': function() {
						this.events.rise('focus', {focus: true});
					},
					'jquery:blur': function() {
						this.events.rise('focus', {focus: false});
					}
				}
			}
		},
		events: {
			'focus': function(e) {
				this.states.toggle('focused', e.focus);
			}
		}
	}
	
}, 'widgets:text-box');
