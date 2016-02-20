


Ergo.defineClass('Ergo.widgets.BasicTree', {

	extends: 'Ergo.widgets.Tree',

	defaults: {

		cls: 'tree basic',

		nestedItem: {

			as: 'item',

			transitions: {
				'* > expanded': function() {
					// загружаем данные поддерева и открываем его
					var item = this;
					if(item.data && item.data.fetch && !item.data._fetched)
						item.data.fetch()
							.then( function() { item.$sub.show(); } );
					else if(!item.data._fetched)
						item.$sub.show();
				},
				'expanded > *': function() {
					// скрываем поддерево и удаляем его
					var item = this;
					this.$sub.hide().then(function(){
						if(item.data && item.data.purge) item.data.purge();
					});
				}
			},

			components: {
				toggler: {
					etype: 'icon',
					as: 'toggle contextual action +caret',
//					stt: 'caret',
					weight: -100,
					autoBind: false,
					onClick: function() {
						this.parent.toggle('expanded');
					},
					states: {
						type: {
							'opened': 'cls:se',
							'closed': 'cls:'
						}
					}
				},
				// content: {
				// 	etype: 'link'
				// },
				sub: {
					as: 'tree'
				}
			},
			states: {
				'expanded': function(on) {
					this.$toggler.states.toggle('opened', on);
					if(on)
						this.rise('itemExpanded');
				}
			}
		}
	}

}, 'widgets:basic-tree');
