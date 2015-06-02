


Ergo.alias('includes:icon-addon', {

	defaults:{ 
		components: {
			icon: {
				etype: 'icon',
				cls: 'addon',
				weight: 10
			}
			// addon: {
			// 	cls: 'box',
			// 	weight: 10,
			// 	cls: 'addon',
			// 	components: {
			// 		icon: {
			// 			etype: 'icon'
			// 		}
			// 	}
			// }			
		}
	},


	overrides: {
		set_icon: function(v) {
			this.icon.opt('text', v);
		}
	}

});


