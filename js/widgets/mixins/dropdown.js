
/**
 * Добавляет компонент $dropdown
 *
 * Состояния:
 * 	`opened`
 *
 * @fires dropdownClosed
 *
 * @mixin dropdown
 */
Ergo.alias('includes:dropdown', {

	defaults: {
//		drop: 'down',
		as: '+has-dropdown',
		components: {
			dropdown: {
				etype: 'list',
				as: 'dropdown',
				include: 'popup effects',
				weight: 100,
				style: {'display': 'none'},
				// TODO неплохо бы сделать шорткаты примесями
				shortcuts: {
					'|': {cls: 'divider'}
				},
				effects: {
					show: {type: 'slideDown', delay: 200},
					hide: {type: 'slideUp', delay: 200}
				},

	// 			popup: {
	// 				at: 'left bottom'
	// //				adjust: true
	// 			},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClosed');
					}
	//				'opened': function
				}
			}
		},
		states: {
			'up:drop': 'drop-up',
			'down:drop': '',
			'left:drop': 'drop-left',
			'right:drop': 'drop-right',
			'opened': function(on, f) {
				on ? this.$dropdown.open() : this.$dropdown.close();
			}
		}
	}

});









Ergo.alias('includes:dropdown:sub', {

	defaults: {
//		drop: 'down',
		as: '+has-dropdown',
		components: {
			sub: {
				etype: 'list',
				as: 'dropdown',
				include: 'popup effects',
				weight: 100,
				style: {'display': 'none'},
				// TODO неплохо бы сделать шорткаты примесями
				shortcuts: {
					'|': {cls: 'divider'}
				},
				effects: {
					show: {type: 'slideDown', delay: 200},
					hide: {type: 'slideUp', delay: 200}
				},

	// 			popup: {
	// 				at: 'left bottom'
	// //				adjust: true
	// 			},
				events: {
					'closed': function() {
						this.parent.states.unset('opened', false);
						this.events.rise('dropdownClosed');
					}
	//				'opened': function
				}
			}
		},
		states: {
			'up:drop': 'drop-up',
			'down:drop': '',
			'left:drop': 'drop-left',
			'right:drop': 'drop-right',
			'opened': function(on, f) {
				on ? this.$sub.open() : this.$sub.close();
			}
		}
	}

});
