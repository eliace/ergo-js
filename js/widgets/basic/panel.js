


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
Ergo.defineClass('Ergo.widgets.Panel', /** @lends Ergo.widgets.Panel.prototype */{

	extends: 'Ergo.widgets.Box',

	defaults: {
//		html: '<div/>',
		cls: 'panel',
		components: {
			header: {
				tag: 'header',
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
				tag: 'footer',
//				html: '<footer/>',
				weight: 10,
				autoRender: 'non-empty'
			}
		}
	},


	props: {
		set: {
			title: function(v) {
				this.$header.$title.opt('text', v);
			}
		}
	}


}, 'widgets:panel');
