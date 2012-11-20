
//= require <widgets/natives/list>


Ergo.declare('Ergo.widgets.MainMenu', 'Ergo.widgets.List', {
	
	defaults: {
		etype: 'list',
		cls: 'e-main-menu',
		mixins: ['selectable'],
		components: {
			logo: {
				etype: 'box',
				weight: -10,
				cls: 'logo',
				content: {
					etype: 'image'
//					src: 'samples/img/logo.png'
				}
			}
		},
		defaultItem: {
			onClick: function() {
				this.parent.selection.set(this);
//				this.events.bubble('select');
			}
		}
	},
	
	
	setLogo: function(v) {
		this.logo.content.opt('src', v);
	},
	
	setSelected: function(i) {
		this.selection.set( i ? this.item(i) : i );
	}
	
	
}, 'main-menu');
