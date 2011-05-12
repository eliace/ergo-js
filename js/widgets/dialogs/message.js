
//= require "dialog"

/**
 * @class
 * @extends Dino.widgets.Dialog
 */
Dino.widgets.MessageBox = Dino.declare('Dino.widgets.MessageBox', 'Dino.widgets.Dialog', /** @lends Dino.widgets.MessageBox.prototype */{
	
	defaultOptions: {
		components: {
			content: {
				dtype: 'box',
				layout: {
					dtype: 'column-layout',
					valign: 'middle'
				},
				components: {
					icon: {
						dtype: 'icon',
						cls: 'dino-messagebox-icon icon32'
					},
					message: {
						dtype: 'box',
						components: {
							baseText: {
								weight: 10,
								dtype: 'text',
								cls: 'dino-messagebox-msg-base'								
							},
							extText: {
								weight: 20,
								dtype: 'text',
								cls: 'dino-messagebox-msg-ext'								
							}
						}
					}
				}	
			}
		},
		destroyOnClose: true,	
//		buttonsAlign: 'center',
		buttonSet: {
			'yes': {text: 'Да', tag: 'yes'},
			'no': {text: 'Нет', tag: 'no'}
//			'ok': {text: 'ОК', tag: 'ok'},
//			'cancel': {text: 'Отмена', tag: 'cancel'}
		},
		iconSet: {
			'info': 'dino-icon-messagebox-info',
			'critical': 'dino-icon-messagebox-critical',
			'warning': 'dino-icon-messagebox-warning'
		}
	},
		
	
	$opt: function(o) {
		Dino.widgets.MessageBox.superclass.$opt.apply(this, arguments);
		
		if('icon' in o) this.content.icon.states.setOnly(this.options.iconSet[o.icon]);
		if('message' in o) this.content.message.baseText.opt('text', o.message);
		if('messageEx' in o) this.content.message.extText.opt('text', o.messageEx);
		
	}
	
	
	
	
}, 'message-box');