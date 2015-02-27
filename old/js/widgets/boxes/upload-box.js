
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.UploadBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-upload-box',
		style: {'position': 'relative', 'display': 'inline-block'},
		events: {
			'mousedown': function(e, w) { w.content.states.set('clicked'); },
			'mouseup': function(e, w) { w.content.states.unset('clicked'); },
			'mouseenter': function(e, w) { w.content.states.set('hovered'); },
			'mouseleave': function(e, w) { w.content.states.unset('hovered'); }
		},
		
		transitions: {
			'> disabled': function() {
				this._uploader.content.el.attr('disabled', true);
			},
			'disabled >': function() {
				this._uploader.content.el.attr('disabled', false);
			}
		},
		
		components: {
			content: {
				weight: 10
			},
			_uploader: {
				opacity: 0,
				weight: 20,
				html: '<form name="file_uploader" method="POST" enctype="multipart/form-data"/>',
				style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
				content: {
					etype: 'file',
					html: '<input name="file" type="file" size="1">',
					style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'},
					opacity: 0,
					events: {
						'change': function(e, w) {
							var val = $(this).val();
							if(val)
//								w.events.bubble('action', {file: val}, e);
								w.events.bubble('fileSelect', {file: val}, e);
						}
					}
				}
			}/*,
			_target: {
				html: '<iframe name="uploader_target" frameborder="no" src="about:blank"/>',
				height: 0,
				width: 0,
				events: {
					'load': function(e, w) {
						//FIXME это работает не для всех браузеров
						var text = w.el[0].contentWindow.document.body.innerHTML;
						if(text) {
							var m = text.match(/^<pre.*>(.*)<\/pre>$/);
							text = m[1];
//							text = text.substring(5, text.length-6);
							w.events.bubble('upload', {textData: text});
						}
					}
				}
			}*/
		}		
	},
	
	
	upload: function(path, data) {
		
		var target_name = '_target'+Ergo.timestamp();
		
		var result = $.Deferred();
		
		this.components.set(target_name, {
			etype: 'box',
			html: '<iframe name="upload'+target_name+'" frameborder="no" src="about:blank"/>',
			height: 0,
			width: 0,
			events: {
				'load': function(e, w) {
					//FIXME это работает не для всех браузеров
					var text = w.el[0].contentWindow.document.body.innerHTML;
					
					//FIXME проверка на text == null некорректна
					if(text) {
						var m = text.match(/^<pre.*>(.*)<\/pre>$/);
						var text2 = (m) ? m[1] : text;

//						w.events.bubble('upload', {textData: text, data: data});
						
						result.resolve({rawData: text, textData: text2});
//						w.destroy();
					}
				}
			}			
		});
		
		
		this._uploader.el.attr('action', path);
		this._uploader.el.attr('target', 'upload'+target_name);
		
		if(data) {
			for(var name in data) {
				var val = data[name];
				var data_el = $('<input name="'+name+'"/>');
				data_el.val(val);
				this._uploader.el.append(data_el);			
			}
			
			// var data_el = $('<input name="data"/>');
			// data_el.val(JSON.stringify(data));
			// this._uploader.el.append(data_el);			
		}

		
		this._uploader.el.submit();
		
		return result;
	}
	
	
	
//	setDisabled: function(v) {
//	}
	
	
}, 'upload-box');
