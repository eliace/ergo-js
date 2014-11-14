


/**
 * Панель
 * 
 * :panel
 * 	header:box
 * 		title:html:span
 * 	content:box
 * 	footer:box
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
		html: '<div/>',
		cls: 'panel',
		components: {
			header: {
				html: '<header/>',
				weight: -10,
				components: {
					title: {
						etype: 'html:span',
						cls: 'panel-title'
					}
				}				
			},
			content: {
			},
			footer: {
				html: '<footer/>',
				weight: 10,
				autoRender: false
			}
		}
	},
	
	
	set_title: function(v) {
		this.header.title.opt('text', v);
	}
	
}, 'widgets:panel');
