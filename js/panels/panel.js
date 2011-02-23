



/**
 * @class
 * @name Dino.widgets.Panel
 * @extends Dino.Widget
 */
Dino.declare('Dino.widgets.Panel', 'Dino.Widget', /** @lends Dino.widgets.Panel.prototype */{
	
	defaultCls: 'dino-panel',
	
	$html: function() { return '<div></div>'; },
	
	defaultOptions: {
//		cls: 'dino-border-all dino-corner-top',
		components: {
			header: {
				dtype: 'box',
				cls: 'dino-panel-header',
				components: {
					title: {
						dtype: 'text-item'
//						selectable: false
					}
//					buttons: {
//						dtype: 'box',
//						style: {'float': 'right'}
//					}
				}	
			},
			content: {
/*				cls: 'dino-panel-content',*/
				dtype: 'box'
			},
			footer: {
				dtype: 'box'
//				cls: 'dino-widget-footer dino-border'
			}
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.Panel.superclass.$init.apply(this, arguments);
		
//		if('headerContent' in o)
//			Dino.utils.overrideOpts(o.components.header, {content: o.headerContent});
//		if('panelContent' in o)
//			Dino.utils.overrideOpts(o.components.content, {content: o.panelContent});
//		if('footerContent' in o)
//			Dino.utils.overrideOpts(o.components.footer, {content: o.footerContent});
		
	},
	
	$opt: function(o) {
		Dino.widgets.Panel.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
		
	}
	
	
	
	
}, 'panel');