


sample('Окна и диалоги', {		
	items: [{
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
			
			
			/*
			 * Варианты обновления окна:
			 *  1. известны размеры окна (внешняя граница)
			 *  2. известны размеры содержимого окна (размеры компонента content)
			 *  3. не известны размеры ни окна, ни содержимого
			 * 
			 * Содержимое может отображаться в окне во время мастабирования, а
			 * может добавляться после 
			 *
			 */ 
				
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
	}, {
		etype: 'button-item',
		text: 'Лайтбокс',
		onClick: function() {
			
			var wnd = $.ergo({
				etype: 'panel',
				mixins: ['window'],
				closeOnOuterClick: true,
//							width: '50%',
//							height: 300,
				title: 'Картинка',
				content: {
					width: 200,
					height: 200,								
				}
			});
			wnd.window.open();
			
			
			var el = $('<img src="img/anime9.jpg">');
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
				
									
				
//							wnd.el.css('display', 'none');
				
//							wnd.content.opt('width', w);
//							wnd.content.opt('height', h);
// 							
//							wnd.window.update();


				wnd.window.resizeByContent(w, h).then(function(){
					
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




