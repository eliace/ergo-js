

Ergo.defineMixin('Ergo.mixins.IconAddon', function(o) {

	o.components = Ergo.smart_override({
		addon: {
			cls: 'box',
			weight: 10,
			cls: 'addon',
			components: {
				icon: {
					etype: 'icon'
//					cls: 'fa fa-fw'
				}
			}
		}
	}, o.components);

	this.set_icon = function(v) {
		this.addon.icon.opt('text', v);
	}


}, 'mixins:icon-addon');



Ergo.alias('includes:icon-addon', {

	defaults:{ 
		components: {
			addon: {
				cls: 'box',
				weight: 10,
				cls: 'addon',
				components: {
					icon: {
						etype: 'icon'
					}
				}
			}			
		}
	},


	_construct: function(o) {

		this.set_icon = function(v) {
			this.addon.icon.opt('text', v);
		}

	}


});


