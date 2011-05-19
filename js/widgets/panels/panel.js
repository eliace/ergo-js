
//= require <containers/box>
//= require <layouts/dock>
//= require <layouts/float>
//= require <widgets/buttons/icon-button>



/**
 * @class
 * @name Dino.widgets.Panel
 * @extends Dino.core.Widget
 */
Dino.declare('Dino.widgets.Panel', 'Dino.core.Widget', /** @lends Dino.widgets.Panel.prototype */{
	
	defaultCls: 'dino-panel',
	
	$html: function() { return '<div></div>'; },
	
	defaults: {
//		cls: 'dino-border-all dino-corner-top',
		components: {
			header: {
				weight: 10,
				dtype: 'box',
	      layout: {
	        dtype: 'dock-layout',
	        updateMode: 'auto'
	      },				
				cls: 'dino-panel-header',
				components: {
					title: {
						dtype: 'text-item',
						dock: false
					},
	        buttons: {
		        dtype: 'box',
		        dock: 'right',
		        layout: 'float',
						style: {'margin-right': '3px'},
		        defaultItem: {
		          dtype: 'icon-button',
		          cls: 'dino-header-button dino-corner-all',
		          onAction: function(){
								this.getParent(Dino.widgets.Panel).events.fire('onHeaderButton', {'button': this.tag});
		          }
		        }
		      }
				}
			},
			content: {
/*				cls: 'dino-panel-content',*/
				weight: 20,
				dtype: 'box'
			}
//			footer: {
//				dtype: 'box'
//			}
		},
		headerButtonSet: {
//			'close': {icon: 'dino-icon-dialog-close', tag: 'close'},
//			'minimize': {icon: 'dino-icon-dialog-minimize', tag: 'minimize'},
//			'maximize': {icon: 'dino-icon-dialog-maximize', tag: 'maximize'}
		}		
	},
	
	
	$init: function(o) {
		Dino.widgets.Panel.superclass.$init.apply(this, arguments);		
	},
	
	$opt: function(o) {
		Dino.widgets.Panel.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
		
		if('headerButtons' in o) {
			var self = this;
			// формируем указанный порядок кнопок
			Dino.each(o.headerButtons, function(name){
				self.header.buttons.addItem(self.options.headerButtonSet[name]);//layout.el.append( self.buttons.getItem(name).el );
			});
//			// включаем указанные кнопки
//			this.buttons.eachItem(function(item) {
//				item.states.toggle('hidden', !Dino.in_array(o.buttons, item.tag)); 
//			});
		}		
		
		
	}
	
	
	
	
}, 'panel');