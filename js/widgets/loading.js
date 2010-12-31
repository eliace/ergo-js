
/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.LoadingOverlay = Dino.declare('Dino.widgets.LoadingOverlay', 'Dino.containers.Box', /** @lends Dino.widgets.LoadingOverlay.prototype */{
	
	defaultOptions: {
		cls: 'dino-loading-overlay',
		opacity: .7,
		content: {
			dtype: 'box',
			cls: 'dino-loading-message',
			content: {
				dtype: 'text-item',
				text: 'Загрузка...',
				showLeftIcon: true,
				leftIconCls: 'dino-icon-spinner'			
			}
		}
	}
	
}, 'loading-overlay');
