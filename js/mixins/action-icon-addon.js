
Ergo.defineMixin('Ergo.mixins.ActionIconAddon', function(o) {

	o.components = Ergo.smart_override({
		addon: {
			cls: 'box',
			weight: 10,
			cls: 'addon',
			components: {
				icon: {
					etype: 'icon',
					onClick: function(e) {
						this.events.rise('action');
						e.stop();
					}
//					cls: 'fa fa-fw'
				}
			}
		}
	}, o.components);

	this.set_icon = function(v) {
		this.addon.icon.opt('text', v);
	}


}, 'mixins:action-icon-addon');