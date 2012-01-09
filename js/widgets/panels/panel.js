
//= require <widgets/box>
//= require <layouts/dock>
//= require <layouts/float>
//= require <widgets/buttons/icon-button>



/**
 * @class
 * @name Ergo.widgets.Panel
 * @extends Ergo.core.Widget
 */
Ergo.declare('Ergo.widgets.Panel', 'Ergo.widgets.Box', /** @lends Ergo.widgets.Panel.prototype */{
	
//	$html: function() { return '<div></div>'; },
	
	defaults: {
		baseCls: 'e-panel',
//		cls: 'e-border-all e-corner-top',
		components: {
			header: {
				weight: 10,
				baseCls: 'e-panel-header',
				etype: 'box',
	      layout: {
	        etype: 'dock-layout',
	        updateMode: 'auto'
	      },				
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
		        etype: 'box',
		        dock: 'right',
		        layout: 'float',
						style: {'margin-right': '3px'},
		        defaultItem: {
		          etype: 'icon-button',
		          baseCls: 'e-header-button e-corner-all',
		          onAction: function(){
								this.getParent(Ergo.widgets.Panel).events.fire('onHeaderButton', {'button': this.tag});
		          }
		        }
		      }
				}
			},
			content: {
//				cls: 'e-panel-content',
				baseCls: 'e-panel-content',
				weight: 20,
				etype: 'box'
			}
//			footer: {
//				etype: 'box'
//			}
		},
		headerButtonSet: {
//			'close': {icon: 'e-icon-dialog-close', tag: 'close'},
//			'minimize': {icon: 'e-icon-dialog-minimize', tag: 'minimize'},
//			'maximize': {icon: 'e-icon-dialog-maximize', tag: 'maximize'}
		}
	},
	
	
	// $init: function(o) {
		// Ergo.widgets.Panel.superclass.$init.apply(this, arguments);		
	// },
	
	$opt: function(o) {
		this.$super(o);
//		Ergo.widgets.Panel.superclass.$opt.apply(this, arguments);
		
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