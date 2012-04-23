

Ergo.declare('Sample.widgets.BaseWindow', 'Ergo.widgets.Panel', {
	
	defaults: {
		etype: 'panel',
		mixins: ['window', 'effects'],
		effects: {
			show: 'fadeIn',
			hide: 'fadeOut',
			delay: 300
		},
		closeOnOuterClick: true,
		destroyOnClose: true,
		title: 'Окно',
		content: {
			style: {'position': 'relative'}
		}
	}
	
	
}, 'base-window');




sample('Окна и диалоги', {
	
	layout: 'vbox',
	
	defaultItem: {
		style: {'margin-bottom': 10}
	},
	
	items: [/*{
		etype: 'button-item',
		text: 'Открыть окно',
		onClick: function() {
			var wnd = $.ergo({
				etype: 'panel',
				mixins: ['window'],
				closeOnOuterClick: true,
				width: '50%',
//							height: 300,
				title: 'Простое окно',
				content: {
					text: Ergo.LOREMIPSUM
				}
			});
			wnd.window.open();
		}
	}, {
		etype: 'button-item',
		text: 'Открыть диалог',
		onClick: function() {
			
			
			var dlg = $.ergo({
				etype: 'dialog',
//							width: '50%',
//							height: '50%',
				maxWidth: '30%'
			});
			dlg.open();
			
			
			setTimeout(function(){
				
//							dlg.content.el.css('display', 'none');
				
				dlg.content.children.add({
					etype: 'box',
					text: Ergo.LOREMIPSUM
				}, 'content');								
				
				dlg.window.update();
				// изменяем размер окна по содержимому
				dlg.window.resizeByContent().then(function(){
				});
				
			}, 1000);
			
		}
	}, */ {
		etype: 'button-box',
		text: 'Окно: [50%, null], контент: null',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'base-window',
				width: '50%',
				content: {
					text: Ergo.LOREMIPSUM
				}				
			});
			wnd.window.open();
			
		}
	}, {
		etype: 'button-box',
		text: 'Окно: [800, 600], контент: null',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'base-window',
				width: 800,
				height: 500,
				title: 'Заданы только размеры окна',
				content: {
					text: Ergo.LOREMIPSUM,
					autoHeight: true
				}				
			});
			wnd.window.open();
			
		}
	}, {
		etype: 'button-box',
		text: 'Окно: null, контент: [800, 600]',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'base-window',
				title: 'Заданы только размеры контента',
				content: {
					text: Ergo.LOREMIPSUM,
					width: 800,
					height: 500
				}				
			});
			wnd.window.open();
			
		}
	}, {
		etype: 'button-box',
		text: 'Окно: [200, 200], контент: null + загрузка',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'base-window',
				width: 200,
				height: 200,
				content: {
					//
					autoHeight: true
				}				
			});
			wnd.window.open();
			
			wnd.content.children.add({
				etype: 'box',
				cls: 'loader'				
			}, '_loader');
			
			setTimeout(function(){
				
				wnd.content.children.remove_at('_loader'); 
				
				wnd.window.resize(800, 600).then(function(){ wnd.$layoutChanged() });
				
			}, 1500);
			
		}
	}, {
		etype: 'button-box',
		text: 'Окно: null, контент: [200, 200] + загрузка',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'base-window',
				content: {
					width: 200,
					height: 200
				}
			});
			wnd.window.open();
			
			wnd.content.children.add({
				etype: 'box',
				cls: 'loader'				
			}, '_loader');
			
			setTimeout(function(){

				wnd.content.children.remove_at('_loader'); 
				
				wnd.window.resizeContent(800, 600).then(function(){	wnd.content.opt({width: 800, height: 600});	wnd.$layoutChanged();	});
				
			}, 1500);
			
		}
	}, {
		etype: 'button-box',
		text: 'Лайтбокс',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'panel',
				mixins: ['window'],
				closeOnOuterClick: true,
				title: 'Лайтбокс',
				content: {
					width: 200,
					height: 200,								
				}
			});
			wnd.window.open();
			
			
			var el = $('<img src="samples/img/anime9.jpg">');
			el.css({'position': 'absolute', 'display': 'none'});
			el.one('load', function(){
				
				var w = el.width();
				var h = el.height();
				
				var kw = 600 / w;
				var kh = 600 / h;
				
				if(kw < kh){
					w = 600;
					h *= kw;
				}
				else {
					w *= kh;
					h = 600;								
				}
				
									
				
				wnd.window.resizeContent(w, h).then(function(){
					
					wnd.content.el.css({'width': w, 'height': h});
					
					wnd.content.children.add({
						etype: 'image',
						hideOnRender: true,
						html: el,
						style: {'position': '', 'display': 'none'},
						width: w,
						height: h
					}, 'content').el.fadeIn(300);
					
				});

				
			});
			
			$('body').append(el);
			
			
		}					
	}]
	
});




