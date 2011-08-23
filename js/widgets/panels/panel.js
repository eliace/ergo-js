
//= require <widgets/box>
//= require <layouts/dock>
//= require <layouts/float>
//= require <widgets/buttons/icon-button>



/**
 * @class
 * @name Ergo.widgets.Panel
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Panel', 'Ergo.core.Widget', /** @lends Ergo.widgets.Panel.prototype */{
	
	$html: function() { return '<div></div>'; },
	
	defaults: {
		baseCls: 'dino-panel',
//		cls: 'dino-border-all dino-corner-top',
		components: {
			header: {
				weight: 10,
				etype: 'box',
	      layout: {
	        etype: 'dock-layout',
	        updateMode: 'auto'
	      },				
				baseCls: 'header',
				components: {
					icon: {
						etype: 'icon',
						style: {'margin-left': '5px'},
		        dock: 'left'
					},
					title: {
						etype: 'text',
						dock: false
					},
	        buttons: {
		        etype: 'list',
		        dock: 'right',
		        layout: 'float',
						style: {'margin-right': '3px'},
		        defaultItem: {
		          etype: 'icon-button',
		          baseCls: 'dino-header-button dino-corner-all',
		          onAction: function(){
								this.getParent(Ergo.widgets.Panel).events.fire('onHeaderButton', {'button': this.tag});
		          }
		        }
		      }
				}
			},
			content: {
//				cls: 'dino-panel-content',
				weight: 20,
				etype: 'box'
			}
//			footer: {
//				etype: 'box'
//			}
		},
		headerButtonSet: {
//			'close': {icon: 'dino-icon-dialog-close', tag: 'close'},
//			'minimize': {icon: 'dino-icon-dialog-minimize', tag: 'minimize'},
//			'maximize': {icon: 'dino-icon-dialog-maximize', tag: 'maximize'}
		}		
	},
	
	
	$init: function(o) {
		Ergo.widgets.Panel.superclass.$init.apply(this, arguments);		
	},
	
	$opt: function(o) {
		Ergo.widgets.Panel.superclass.$opt.apply(this, arguments);
		
		if('title' in o) this.header.title.opt('text', o.title);
		if('icon' in o) this.header.icon.states.setOnly(o.icon);
		
		if('headerButtons' in o) {
			var self = this;
			// формируем указанный порядок кнопок
			Ergo.each(o.headerButtons, function(name){
				self.header.buttons.items.add(self.options.headerButtonSet[name]);//layout.el.append( self.buttons.getItem(name).el );
			});
//			// включаем указанные кнопки
//			this.buttons.eachItem(function(item) {
//				item.states.toggle('hidden', !Ergo.in_array(o.buttons, item.tag)); 
//			});
		}		
		
		
	}
	
	
	
	
}, 'panel');