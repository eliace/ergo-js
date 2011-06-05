
//= require <widgets/box>


/**
 * @class
 * @extends Dino.containers.ListBox
 */
Dino.widgets.LoadingBox = Dino.declare('Dino.widgets.LoadingBox', 'Dino.widgets.Box', /** @lends Dino.widgets.LoadingOverlay.prototype */{
	
	defaults: {
		components: {
			overlay: {
				weight: 1,
				dtype: 'box',
				cls: 'dino-loading-overlay',
				opacity: .7				
			},
			message: {
				weight: 2,
				dtype: 'box',
				opacity: 1,
				cls: 'dino-loading-message',
				content: {
					dtype: 'text-item',
					text: 'Загрузка...',
					showLeftIcon: true,
					leftIconCls: 'dino-icon-loader'			
				}				
			}
		}
	}
	
}, 'loading-overlay');
