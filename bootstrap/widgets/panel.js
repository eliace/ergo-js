
/*
 * While not always necessary, sometimes you need to put your DOM in a box. For those situations, try the panel component.
 */

Ergo.defineClass('Bootstrap.widgets.Panel', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'panel',
		appearance: 'default',
		states: {
			'default:appearance': 'panel-default',
			'primary:appearance': 'panel-primary',
			'success:appearance': 'panel-success',
			'info:appearance': 'panel-info',
			'warning:appearance': 'panel-warning',
			'danger:appearance': 'panel-danger'
		},		
		components: {
			heading: {
				cls: 'panel-heading',
				components: {
					title: {
						etype: 'html:h3',
//						html: '<h3/>',
						cls: 'panel-title'
					}
				}
			},
			body: {
				cls: 'panel-body'
			},
			footer: {
				cls: 'panel-footer',
				autoRender: 'no'
			}
		}
	},
	
	setTitle: function(v) {
		this.heading.title.opt('text', v);
	}
	
}, 'bootstrap:panel');


