

/**
 * @class
 * @name Dino.widgets.Panel
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.Panel', 'Dino.Widget', /** @lends Dino.widgets.Panel.prototype */{
	
	defaultCls: 'dino-panel',
	
	_html: function() { return '<div></div>'; },
	
	defaultOptions: {
		cls: 'dino-border-all dino-corner-top',
		components: {
			header: {
				dtype: 'box',
				cls: 'dino-widget-header dino-border-bottom',
				components: {
					title: {
						dtype: 'text-item',
						selectable: false
					},
					buttons: {
						
					}
				}	
			},
			content: {
				dtype: 'box'
			},
			footer: {
				dtype: 'box'
//				cls: 'dino-widget-footer dino-border'
			}
		}
	},
	
	
	_init: function(o) {
		Dino.widgets.Panel.superclass._init.apply(this, arguments);
		
//		if('headerContent' in o)
//			Dino.utils.overrideOpts(o.components.header, {content: o.headerContent});
//		if('panelContent' in o)
//			Dino.utils.overrideOpts(o.components.content, {content: o.panelContent});
//		if('footerContent' in o)
//			Dino.utils.overrideOpts(o.components.footer, {content: o.footerContent});
		
	},
	
	_opt: function(o) {
		Dino.widgets.Panel.superclass._opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
		
	}
	
	
	
	
}, 'panel');