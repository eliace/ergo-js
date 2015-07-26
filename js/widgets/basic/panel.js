


/**
 * Панель
 * 
 * :`panel`
 * \s	header:`box`
 * \s\s		title:`html:span`
 * \s	content:`box`
 * \s	footer:`box`
 * 
 * Опции:
 * 	`title`
 *  
 * @class
 * @name Ergo.widgets.Panel
 * @extends Ergo.core.Widget
 */
Ergo.defineClass('Ergo.widgets.Panel', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Panel.prototype */{
	
	defaults: {
//		html: '<div/>',
		cls: 'panel',
		components: {
			header: {
				etype: 'html:header',
//				html: '<header/>',
				weight: -10,
				components: {
					title: {
						etype: 'title',
						autoRender: 'non-empty'
//						cls: 'panel-title'
					}
				}				
			},
			content: {
			},
			footer: {
				etype: 'html:footer',
//				html: '<footer/>',
				weight: 10,
				autoRender: 'non-empty'
			}
		}
	},
	
	
	set_title: function(v) {
		this.$header.$title.opt('text', v);
	}
	
}, 'widgets:panel');
