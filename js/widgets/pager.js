


Dino.declare('Dino.widgets.Pager', 'Dino.containers.Box', {
	
	defaultOptions: {
		cls: 'dino-pager',
		items: [{
			dtype: 'icon-button',
			icon: 'led-icon-control-rewind'
		}, {
			dtype: 'icon-button',
			icon: 'led-icon-control-start'
		}, {
			dtype: 'box',
			cls: 'dino-split'
		}, {
			dtype: 'text'
		}, {
			dtype: 'textfield'
		}, {
			dtype: 'text'
		}, {
			dtype: 'box',
			cls: 'dino-split'
		}, {
			dtype: 'icon-button',
			icon: 'led-icon-control-play'			
		}, {
			dtype: 'icon-button',
			icon: 'led-icon-control-fastforward'			
		}]
	}
	
	
}, 'pager');
