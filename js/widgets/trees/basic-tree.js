


Ergo.defineClass('Ergo.widgets.BasicTree', 'Ergo.widgets.Tree', {
	
	defaults: {
		nestedItem: {
			
			transitions: {
				'* > expanded': function() {
					// загружаем данные поддерева и открываем его
					var self = this;
					if(this.data && this.data.fetch && !this.data._fetched)
						this.data.fetch().then(function(){ self.subtree.show(); });
					else if(!this.data._fetched)
						this.subtree.show();
				},
				'expanded > *': function() {
					// скрываем поддерево и удаляем его
					var self = this;
					this.subtree.hide().then(function(){
						if(self.data && self.data.purge) self.data.purge();
					});
				}
			},
			
			components: {
				toggler: {
					etype: 'box',
					cls: 'toggle',
					weight: -100,
					$content: {
						etype: 'html:span',
						cls: 'caret'
					},
					onClick: function() {
						this.parent.states.toggle('expanded');
					},
					states: {
						'opened:type:': 'se',
						'closed:type': ''
					}
				},
				content: {
					etype: 'link'
				}
			},
			states: {
				'expanded': function(on) {
					this.toggler.states.toggle('opened', on);
				}
			}
		}
	}
	
}, 'widgets:basic-tree');
