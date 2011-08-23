
//= require "dialog"

/**
 * @class
 * @extends Ergo.widgets.Dialog
 */
Ergo.widgets.MessageBox = Ergo.declare('Ergo.widgets.MessageBox', 'Ergo.widgets.Dialog', /** @lends Ergo.widgets.MessageBox.prototype */{
	
	defaults: {
		components: {
			content: {
				etype: 'box',
				layout: {
					etype: 'column-layout',
					valign: 'middle'
				},
				components: {
					icon: {
						etype: 'icon',
						cls: 'dino-messagebox-icon icon32'
					},
					message: {
						etype: 'box',
						components: {
							baseText: {
								weight: 10,
								etype: 'text',
								cls: 'dino-messagebox-msg-base'								
							},
							extText: {
								weight: 20,
								etype: 'text',
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
		Ergo.widgets.MessageBox.superclass.$opt.apply(this, arguments);
		
		if('icon' in o) this.content.icon.states.setOnly(this.options.iconSet[o.icon]);
		if('message' in o) this.content.message.baseText.opt('text', o.message);
		if('messageEx' in o) this.content.message.extText.opt('text', o.messageEx);
		
	}
	
	
	
	
}, 'message-box');